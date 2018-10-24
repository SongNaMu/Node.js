const redis = require('redis'),
	client = redis.createClient(6379, "127.0.0.1");
client.auth("song", (err, result)=> {
	if(err){
		console.log("err : ", err);
	}else{
		console.log("result : ", result);
	}
});

client.publish("pushnoti", "i am sending my last message.");
	

