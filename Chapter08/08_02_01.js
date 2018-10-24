const redis = require ("redis"),
	client = redis.createClient(6379,'127.0.0.1');
client.auth("test");
client.set("item:abc", "some val", 'ex', 100000, (err, result) => {
	console.log("Resule: ");
	console.log(result);
});
client.setex("item:abc", 1000000, "some val", (err, result) => {
	console.log("Resule: ");
	console.log(result);
});
