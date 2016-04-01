var	express = require('express')
	,	app = express()
	, config = require('./config.json')
	, http = require('http').Server(app)
	, io = require('socket.io')(http);
	
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
	res.render('index.html', {
    title: "Main"
  });
});

// socket 
io.on('connection', function(socket){
  console.log('a user connected');
  
  socket.on('message', function(msg) {
    console.log('message: ' + msg);
    
    socket.broadcast.emit('message', msg);
    //io.emit('message', msg);
  });
});

// static 은 view 선언 다음에 사용
app.use(express.static(__dirname + '/contents'));

// server listen start
http.listen(config.webserver.port, function() {
  console.log('Simple Chatting server running at ' + config.webserver.host + ':' + config.webserver.port);
}); 