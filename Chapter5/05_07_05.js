const fs = require('fs');

//디렉터리 내의 파일 목록을 읽어 옵니다.
fs.readdir('tempdir', (err, files) => {
	if(err) {
		throw err;
	}
	//파일 목록을 출력합니다.
	console.log(files);
});

fs.stat();

