const mysql = require('mysql');
const connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '123456',
	database : 'php'
});
connection.connect((err) => {
	if(err) {
		console.error('error connecting: ' + err.stack);
		return;
	}
	console.log('connected as id ' + connection.threadId);
});

connection.query('select * from board where num = ?',	['5'], (err, rows, fields) => {
	//connection.release();
	if(err){
		console.error(err);
		return;
	}
	
	//console.log(fields);

	for(let i = 0; i < rows.length; i++){
	  console.log("Row: ", rows[i]);
	}
});
