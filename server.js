var express = require('express'),
	sio = require('socket.io');

var app = express.createServer(express.bodyParser(),express.static(__dirname));
app.listen(3000);
var io = sio.listen(app);
io.sockets.on('connection',function  (socket) {
	console.log("有人链接进来");
	socket.on('join',function  (name) {
		socket.nickname = name;
		socket.broadcast.emit('announcement',name+'加入进来 <br />');
	});

	socket.on('text', function(msg) {
		socket.broadcast.emit('textin',socket.nickname,msg);
	})
})

