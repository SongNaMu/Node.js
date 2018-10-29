const SockServer = require('socket.io');
const io = new SockServer();

let SockList = {};
const chat = io
	.of('/chat')
	.on('connection', (socket) => {
		SockList[socket.id] = null;
		socket.emit("msg", "서버에 접속되었습니다." + new Date());
		console.log("사용자 접속");
		
		for(let sock_id in SockList){
			if(sock_id != socket.id && SockList[sock_id] == null){
				SockList[sock_id] = socket.id;
				SockList[socket.id] = sock_id;
				break;
			}
		}

		let opt_socket = SockList[socket.id];
		if(opt_socket){
			chat.sockets[opt_socket].emit("msg", "[상대방]이 서버에 접속하였습니다.");
			chat.sockets[socket.id].emit("msg", "[상대방과 연결이 되었습니다.]");
		}

		socket.on('msg', (data) => {
			console.log("사용자 가 메세지 보냄");
			const opt_socket = SockList[socket.id];
			if(opt_socket){
				chat.sockets[opt_socket].emit("msg", "[상대방]" + data);
				chat.sockets[socket.id].emit("msg", "[나]" + data);
			}
		})
		.on('disconnect', () => {
			console.log("사용자 접속 종료");
			let opt_socket = SockList[socket.id];
			if(opt_socket){
				chat.sockets[opt_socket].emit("msg", "상대방이 접속을 종료했습니다.");
				SockList[opt_socket] = null;
			}
			delete SockList[socket.id];
		});
});

	io.listen(3000);

	setInterval(() => {
		console.log("interval");
		let count = 0;
		for(let sock_id in SockList){
			count++;
		}
		chat.emit("msg", "[전체 공지!] 현재 접속자는 총" + count + "명 입니다.");
	}, 5000 * 10);
