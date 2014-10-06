var http = require('http');

var serv = http.createServer(function  (req,res) {
	
	res.writeHead(200,{"Content-Type":"text/html"});
	res.end(
		'<form method="post" action="/url">'+
		'<label>名字</label>'+
		'<input type="text" name="" id="" />'+
		'<input type="submit" value="提交" />'+
		'</form>'
	);
})
serv.listen(3000);


http.request({
	host:'127.0.0.1',
	port:3000,
	url:'/',
	method:'GET'
},function  (res) {
	var body ="";
	res.setEncoding('utf8');
	res.on('data',function  (chunk) {
		body+=chunk;
	});
	res.on('end',function  () {
		console.log("接收完毕"+body);
	})
}).end();
