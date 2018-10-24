const http = require('http');
let session_cookie_list = [];


const SessionStr = () => {
	let str = "";
	const base_str = "123456789abcdefghijkmlnopqrstu";
	for(let i = 0; i < 64; i++){
		str += base_str[Math.floor(Math.random()*base_str.length)];
	}
	return str;
}

const server = http.createServer((req, res) => {
	let session_cookie;

	if(req.headers.cookie){
		console.log("i have cookie");
		console.log("req.headers.cookie : ",req.headers.cookie);
		let cookies = req.headers.cookie.split(";").map((obj) => {
			console.log("obj = ",obj);	
			let temp = obj.trim().split("=");
			console.log("obj.trim().split(=) : ", temp);
			if(temp[0] == 'sessions'){
				session_cookie = temp[1];
			}
			return obj.trim().split("=");
		});
	}
	

	let expire_time = new Date().getTime()+1000*86400;
	if( !session_cookie || !session_cookie_list[session_cookie]){
		console.log("쿠키가 없습니다.\n");
		session_cookie = SessionStr();
		session_cookie_list[session_cookie] = {
			session_data: {},
			expire: expire_time
		};
	
		res.setHeader('Set-Cookie', 'sessions=' + session_cookie + '; Expires=' + new Date(expire_time).toUTCString() + "; HttpOnly;");
	}else{
		console.log("쿠키 발견\n");
		session_cookie_list[session_cookie].expire = expire_time;
		res.setHeader('Set-Cookie', 'sessions=' + session_cookie + '; Expires=' + new Date(expire_time).toUTCString() + "; HttpOnly;");
	}

	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Hello World\n');
});

server.listen(8080, (err) => {
	if(err){
		console.log(err);
	}
	console.log('Server running');
								
});
