const express = require('express');
const app = express();
const http = require('http').Server(app);
const config = require('./config.json');

require('./controllers/socket.js')(http);

// app.set('views', __dirname + '/views');
// app.use(express.static(__dirname + '/contents'));

// app.get('/', function(req, res) {
//   res.render('index.html', {
//     title: 'Main',
//   });
// });

// server start
http.listen(config.port, () => {
  console.log('simple chat server running at ' + config.host + ':' + config.port);
});
