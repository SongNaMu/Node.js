const data = require('./data.js');
ServerFunction = () => {
	data.main();
	console.log(data.list);
};

ServerFunction.createServer();

