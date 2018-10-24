const mysql = require('mysql');

const connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '123456',
	database : 'php'
});

connection.connect((err)=>{
	if(err){
		console.error("error connecting : " + err.stack);
		return;
	}
	console.log('connected as id ' + connection.threadId);
});

let val1 = '5';
let val2 = '120';

connection.query('select * from board where num = ? or num = ?', [val1, val2], (err, rows, fileds)=>{
	for(let i = 0; i < rows.length; i++){
		console.log("data : " , rows[i]);
	}	
								
});

