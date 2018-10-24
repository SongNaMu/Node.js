const mysql = require('mysql');

const connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '123456',
	database : 'php'
});

connection.query( 'update board set writer = "song", title = "title", content = "content" where num = 7', (err, result) => {
	if(err){
		console.error(err);
		return;
	}
	console.log('result : ', result);
});
