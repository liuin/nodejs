if (typeof (io) == 'object' ) {
	window.onload = function  () {
		var socket = io.connect();
		socket.on('connect',function  () {
			//通过join事件发送昵称
			socket.emit('join',prompt("输入你的名字"));
			socket.on('announcement',function  (msg) {
				var htmldiv = document.getElementById('talllist');
				var gval = htmldiv.innerHTML;
				htmldiv.innerHTML = gval + msg; 
			})
		})

	    function addMessage (from,text) {
			var htmldiv = document.getElementById('talllist');
			var gval = htmldiv.innerHTML;
			htmldiv.innerHTML = gval + from + ":" + text +"<br />"; 
	    }

		var form1 = document.getElementById('form');
		var input = document.getElementById('input');
		document.getElementById('form').onsubmit = function  () {
			addMessage('我',input.value);
			socket.emit('text',input.value);

			input.value = "";
			input.focus();
			return false;
		}

		socket.on('textin',addMessage);
		
	}
}
