/*-- 通过connet插件创建服务器 --*/
var http = require('http');
var connect = require('connect');
var server = connect.createServer();
server.use(connect.static(__dirname));
server.listen(80);

server.use(function  (req, res,next) {
	console.error('%s,%s',req.method,req.url);
	next();
})

server.use(function  (req, res,next) {
	if ('GET' == req.method && '/' == req.url) {
		//响应请求文件
	}else {
		next();
	}
})

server.use(function  (req, res,next) {
	//最后一个
	res.writeHead(404);
	res.end('没有找到文件');
})

console.log(1277+166+36);