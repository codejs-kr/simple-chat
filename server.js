var	express = require('express')
	,	app = express()
	, config = require('./config.json')
	, http = require('http').Server(app)
	, io = require('socket.io')(http);
	
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/contents'));

app.get('/', function(req, res) {
	res.render('index.html', {
    title: "Main"
  });
});

// socket 
/*
 * io - 소켓 서버
 * socket - 클라이언트와 연결된 소켓 
 * io.sockets.in(roomId) - 타겟 룸에 전체 메시지 전달.
 */ 
var socketIds = [];
io.on('connection', function(socket) {
  var roomId = null;
  
  // 룸접속
  socket.on('joinRoom', function(roomNum, nickName) {
  	roomId = roomNum;
	  socket.join(roomId);  	
	  
  	// 유저 목록
  	socketIds[nickName] = socket.id;
  	io.sockets.in(roomId).emit('joinRoom', roomId, nickName, Object.keys(socketIds));
  	console.log('ROOM LIST', io.sockets.adapter.rooms);
  });
  
  // 룸퇴장
  socket.on('leaveRoom', function(roomNum, nickName) {
  	socket.leave(roomNum);
  	delete socketIds[nickName];
  	
  	console.log('leaveRoom', roomNum, Object.keys(socketIds));
  	socket.broadcast.to(roomNum).emit('leaveRoom', nickName, Object.keys(socketIds));
  });
  
  // 메시징
  socket.on('message', function(data) {
    //console.log('message: ' + data);
    
    if (data.to == 'all') {
	    socket.broadcast.to(roomId).emit('message', data); // 자신 제외 룸안의 유저
    } else {
    	var targetSocket = socketIds[data.to];
    	
    	if (targetSocket) {
		 	 	io.sockets.in(targetSocket).emit('message', data);
    	}
    }
    //socket.broadcast.emit('message', data); 					// 자신 제외 메시지 전송  
    //io.emit('message', data); 							 					// 자신 포함 전체 룸 메시지 전송
    //io.sockets.in(roomId).emit('message', data); 			// 자신 포함 룸안의 유저
  });
  
  // 타이핑
  socket.on('typing', function(nickName) {
  	socket.broadcast.to(roomId).emit('typing', nickName);
  });
  
  // 소켓 연결해제
  socket.on('disconnect', function() {
    console.log('a user disconnected');
  });
});

// server listen start
http.listen(config.webserver.port, function() {
  console.log('Simple Chatting server running at ' + config.webserver.host + ':' + config.webserver.port);
}); 