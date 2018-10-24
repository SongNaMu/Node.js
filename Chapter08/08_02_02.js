const redis = require("redis"),
	client = redis.createClient(6379, '127.0.0.1');
	client.auth("password", (err, result)=>{
		if(err){
			console.log("err : ", err);
		}else{
		console.log("login : ", result);
		}
});
client.on("subscribe", (channel, message) => {
	console.log("client subscribe channel " + channel);
});
client.on("message", (channel, message) => {
	console.log("client message channel " + channel + ": " + message);
});
client.subscribe("pushnoti");
