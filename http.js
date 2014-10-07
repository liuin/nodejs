var fs = require("fs");
var http = require('http');
var server = http.createServer(function  (req,res) {
	if ('GET' == req.method && '/' == req.url) {
		sload(__dirname + '/index.html','text/html');
	}else {
		res.writeHead(200,{"Content-Type":"text/html"});
		res.end('<p>空页面</p>');
	}

	function sload(path,type) {
		res.writeHead(200,{"Content-Type":type});
		fs.createReadStream(path).pipe(res);
	}
})
server.listen(80);
