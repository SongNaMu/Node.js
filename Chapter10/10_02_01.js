const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
	
	if(req.url == '/'){
		fs.readFile('index.html', 'utf8', (err, data) => {
			if(err){
				res.statusCode = 404;
				res.setHeader('Content-Type', 'text/plain');
				res.end('File Not Found\n');
			}else{
				res.statusCode = 200;
				res.setHeader('Content-Type', 'text/html');
				res.end(data);
			}
		});
	}else if(req.url == '/longpolling'){
		HttpConnection.push([req, res]);
	}else{
		console.log(req.url);
		setTimeout(() => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'text/plain');
			res.end('Hello World\n');
		}, 1000);
	}
});

server.listen(8080, (err) => {
	if(err){
		console.log(err);
	}
	console.log('Server running');
});

let HttpConnection = [];

setInterval(() => {
	console.log(HttpConnection.length);
	if(HttpConnection.length > 0 ){
		const Connection = HttpConnection.pop();
		const res = Connection[1];
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');
		res.end('End\n');
	}
},10*1000);
