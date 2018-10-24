const http = require('http');

const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.write('first\n');
	res.end('Hello World\n');
	res.write('second\n');
	});

server.listen(port, (err) => {
	if(err){
		console.log(err);
		}
	console.log('Server running');
	});
