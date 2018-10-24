const mysql = require('mysql');
const connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '123456',
	
	database : 'node'
	});
connection.connect((err)=>{
	if(err){
		console.error('error connecting: ' + err.stack);
		return;
		}
	console.log('connected as id ' + connection.threadId);
	});
connection.query('select 1 + 1 as solution', (err, rows, fields)=>{
	if(err) throw err;
	console.log('The solution is: ', rows[0].solution);
});

connection.end();
