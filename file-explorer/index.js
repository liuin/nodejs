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