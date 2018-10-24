const pool = mysql.createPool({
  host : 'localhost',
	user : 'root',
	password : '12346',
  database : 'node',
	connectionLimit : 5
});

pool.getConnection((err, connection)=>{
	pool.query( 'select something from sometable', (err, rows)=>{
		//데어터를 사용한 작업
		connection.release();
		//현재 코드에서는 DB와의 접속이 끊겨서 이 이후로는 잡업이 불가능
	});
});
