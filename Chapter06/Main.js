const user = require('./user.js');
const board = require('./board.js');

const ServerFunction = () => {
	if(condition == 'user'){
		user.main();
	}else if(condition == 'board'){
		board.main();
	}
};

ServerFunction.createServer();

