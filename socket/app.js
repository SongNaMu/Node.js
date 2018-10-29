var app = require('express')();
var server = require('http').createServer(app);
//http server를 socket.io server로 upgrade한다.
//
var io = require('socket.io')(server);

server.listen(3000, () => {
		console.log('Socket IO server listening on port 3000');
});


