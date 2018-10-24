const mysql = require('mysql');
const connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '123456',
	database : 'php'
});

connection.connect((err)=>{
	if(err){
		console.error('error connection: ' + err.stack);
		return;
	}
	console.log('connected as id ' + connection.threadId);
});


connection.query('select * from board', (err, row, fields) => {

	if(err){
		//에러가 발생할 경우 에러를 표시ㅏ고 종료한다.
		console.error(err);
		return;
	}

	//받은 결과 값의 필드 리스트를 보여준다.
	//console.log(fields);

	//결과물을 출력한다.
	for(let i = 1; i < row.length; i++){
	  console.log("Row: ", row[i]);
	}
});
