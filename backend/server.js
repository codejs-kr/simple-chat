const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const config = require('./config.json');

// app.set('views', __dirname + '/views');
// app.use(express.static(__dirname + '/contents'));

// app.get('/', function(req, res) {
//   res.render('index.html', {
//     title: 'Main',
//   });
// });

/*
 * socket.io
 * @REF - https://github.com/socketio/socket.io
 *
 * io - 소켓 서버
 * socket - 클라이언트와 연결된 하나의 소켓
 * io.sockets.in(roomId).emit() - 타겟 룸 소켓들 전체에 메시지 전달
 * io.sockets.manager.rooms - 현재 생성되어 있는 모든 room 목록을 리턴
 *
 * [Send methods]
 * io.emit('message', data); 							 							// 자신 포함 전체룸 유저들에게 전송
 * io.sockets.in(roomId).emit('message', data); 				// 자신 포함 해당룸 유저들에게 전송
 * socket.broadcast.emit('message', data); 							// 자신 제외 전체에 메시지 전송
 * socket.broadcast.to(roomId).emit('message', data);  	// 자신 제외 해당룸 유저들에게 전송
 */

let socketIdArray = [];
io.on('connection', (socket) => {
  let roomId = null;

  // 소켓 연결해제
  socket.on('disconnect', () => {
    console.log('a user disconnected', socket.id);
  });

  // 룸접속
  socket.on('joinRoom', (roomNum, nickName) => {
    roomId = roomNum;
    socket.join(roomId); // 소켓을 특정 room에 binding합니다.

    // 유저 목록
    socketIdArray[nickName] = socket.id;
    io.sockets.in(roomId).emit('joinRoom', roomId, nickName, Object.keys(socketIdArray));
    console.log('ROOM LIST', io.sockets.adapter.rooms);
  });

  // 룸퇴장
  socket.on('leaveRoom', (roomNum, nickName) => {
    socket.leave(roomNum);
    delete socketIdArray[nickName];
    socket.broadcast.to(roomNum).emit('leaveRoom', nickName, Object.keys(socketIdArray));
  });

  // 메시징
  socket.on('message', (data) => {
    //console.log('message: ' + data);

    if (data.to == 'all') {
      socket.broadcast.to(roomId).emit('message', data); // 자신 제외 룸안의 유저
    } else {
      // 귓속말
      const targetSocketId = socketIdArray[data.to];
      if (targetSocketId) {
        //io.to(targetSocketId).emit('message', data);
        io.sockets.connected[targetSocketId].emit('message', data);
      }
    }
  });

  // 타이핑
  socket.on('typing', (nickName) => {
    socket.broadcast.to(roomId).emit('typing', nickName);
  });
});

// server listen start
http.listen(config.port, () => {
  console.log('simple chat server running at ' + config.host + ':' + config.port);
});
