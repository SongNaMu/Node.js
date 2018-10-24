for(let i = 0; i < 6; i++){
	pool.getConnection((err, connection)=>{
		if(err){
			console.log("ERROR:",err);
			return;
		}

		connection.query('seelct comething from sometable', (err, rows)=>{
			//데이터를 사용한 이러저러한 작업들
			console.log(new Date());

			setTimeout(()=>{
				connection.release();
			}, 3000);

			//현재 코드에서 DB와의 접속이 끊겨서 이후로는 작업이 불가능
		});
	});
}

