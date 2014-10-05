var http = require('http');
var serv = http.createServer(function  (req,res) {
	res.writeHead(200,{"Content-Type":"text/html"});
	res.end('<p>see it</p>');
})
serv.listen(8080);
