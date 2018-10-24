const SockServer = require('socket.io');
const io = new SockServer();

const chat = io.of('/chat').on('connection', (socket) => {
	console.log("connection");
	socket.on('msg', (data) => {
		console.log("RECV MSG", data);

		setTimeout(() => {
			socket.emit("msg", "Send from Server1" + new Date());
			chat.emit("msg", "Send from Server2" + new Date());
		}, 1000);
	})
	.on('disconnect', () => {
		console.log("disconnect");
	});
});

io.listen(3000);
