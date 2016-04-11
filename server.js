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
io.on('connection', function(socket){
  console.log('a user connected');
  var roomId = null;
  
  // 룸접속
  socket.on('joinRoom', function(room, nickName) {
  	roomId = room;
	  socket.join(roomId);  	
  	io.sockets.in(roomId).emit('joinRoom', roomId, nickName);
  	console.log('ROOM LIST', io.sockets.adapter.rooms);
  });
  
  // 룸퇴장
  socket.on('leaveRoom', function(room, nickName) {
  	socket.leave(roomId);
  	socket.broadcast.to(roomId).emit('leaveRoom', nickName);
  });
  
  // 메시징
  socket.on('message', function(msg) {
    //console.log('message: ' + msg);
    
    socket.broadcast.to(roomId).emit('message', msg); // 자신 제외 룸안의 유저
    //socket.broadcast.emit('message', msg); 					// 자신 제외 메시지 전송  
    //io.emit('message', msg); 							 					// 자신 포함 전체 룸 메시지 전송
    //io.sockets.in(roomId).emit('message', msg); 		// 자신 포함 룸안의 유저
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