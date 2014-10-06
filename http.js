var http = require('http');
console.log("请选择你的文件或者路径111");
var serv = http.createServer(function  (req,res) {
	res.writeHead(200,{"Content-Type":"text/html"});
	res.end('<p>changeoidfos it 222</p>');
})
serv.listen(80);
