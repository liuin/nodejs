/*-- 创建一个服务器 --*/
var http = require('http');
var serv = http.createServer(function  (req,res) {
	res.writeHead(200,{"Content-Type":"text/html"});
	res.end('<p>see it</p>');
})
serv.listen(8080);


/** 文件操作 **/
var fs = require('fs');
var gfiles = 0;
 

//读取文件
function csfile () {
	fs.readdir(__dirname,function(err,files) {
		gfiles = files;
		console.log("");
		if (!files.length) {
			return console.log("没有文件");
		}
		console.log("请选择你的文件或者路径");
		function  file(i) {
			var filename = files[i];
			fs.stat(__dirname+'/'+filename,function  (err,stat) {
				if (stat.isDirectory()) {
					console.log(' ' + i + '' + filename + '目录');
				}else {
					console.log(' ' + i + '' + filename + '文件');
				}
				i++;
				
				if (i == files.length) {
					read();
				}else {
					file(i);
				}

			})
		}
		file(0);

		//程序退出
		//process.exit();
	})
}

//csfile();

function read () {
		process.stdout.write('输入你的选择');
		process.stdin.resume();
		process.stdin.setEncoding('utf8');
		process.stdin.on('data',option);
}

function  option(data) {
	var filename = gfiles[Number(data)]
	if (!gfiles[Number(data)]) {
		process.stdout.write('没有该资料,请重新选择');
	}else {
		process.stdin.pause();
		fs.readFile(__dirname + '/' + filename,'utf8',function(err,data) {
			console.log(data.replace(/(.*)/g,'$1'));
		})
	}
}

//监控文件变化
var stream = fs.createReadStream("ts.js");

var filests = fs.readdirSync(process.cwd());
filests.forEach(function  (file) {
	
	if (/ts/.test(file)) {
		fs.watchFile(process.cwd() + '/' + file,function  () {
			console.log("文件ts.js修改了");
			process.exit();
		})
	}
})

//客户端请求
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



/*-- 自动重启服务器  --*/
npm install supervisor -g
supervisor index.js

/*-- 用connect插件来布局服务器 --*/
{
	"name":"my-website",
	"version":"0.0.1",
	"dependencies":{
		"connect":"1.8.7"
	}
}

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