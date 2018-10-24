const http = require('http');

const SessionStr = () => {
	let str = "";
	const base_str = "0123456789abcd";
	for(let i = 0; i < 64; i++){
		str += base_str[Math.floor(Math.random()*base_str.length)];
	}
	return str;
}
console.log(SessionStr());

const server = http.createServer((req, res) => {
	
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	let session_cookie = SessionStr();
	res.setHeader('Set-cookie',
		['session='+session_cookie+'; Expires='+new Date
		(new Date().getTime() + 1000 * 86400).toUTCString()+"; HttpOnly;",
		'cookie=test2; Expires='+new Date(new Date().getTime() + 1000 * 86400).
		toUTCString()+";"]
		);
	res.end('Hello world\n');
	console.log(['session='+session_cookie+'; Expires='+new Date
		(new Date().getTime() + 1000 * 86400).toUTCString()+"; HttpOnly;",
		'cookie=test2; Expires='+new Date(new Date().getTime() + 1000 * 86400).
	  toUTCString()+";"]);
});

server.listen(8080, (err) => {
	if(err){
		console.log("Error Print : ",err);
	}
	console.log('Seerver running');
});

