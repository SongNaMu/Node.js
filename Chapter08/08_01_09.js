const mysql = require('mysql');

const connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '123456',
	database : 'php',
});

connection.query('delete from board where num = 4', (err, result) => {
	if(err){
		console.error(err);
		return;
	}

	console.log('result: ', result);
});

