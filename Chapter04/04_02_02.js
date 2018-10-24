const http = require('http');

const server = http.createServer((req, res) => {
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	console.log("ip: ", ip);
	console.log("url: ", req.url);
	console.log("headers: ", req.headers);
	console.log("body:", req.body);
	
	
	res.statusCode = 208;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Hello World\n' + JSON.stringify(req.headers, null, 4));
});

server.listen(3000, (err) => {
	if(err) {
		console.log(err);
	}
	console.log('Server running');
});
