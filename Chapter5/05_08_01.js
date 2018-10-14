const https = require('https');

//가져온 데이터를 담는 변수를 선언합니다.
let CrawlData = [];

https.get('https://nodejs.org/dist/latest-v8.x/docs/api/index.json', (res) => {
	let body = '';
	res.on('data', (d) => {
		body += d;
	});
	res.on('end', () => {
		//가져온 데이터를 JSON Object 형태로 변환하여 저장합니다.
		let index_data = JSON.parse(body).desc;
		
		//루프를 돌면서 페이지 데이터를 가져옵니다.
		for(let i = 0; i < index_data.length; i++){
			//해당 데이터의type이 text일 경우에만 데이터를 분석합니다.
			if(index_data[i].type == 'text'){
			/* 사실 이 부분은 정규식을 사용하면 좀 더 편리합니다.
			 * 하지만 이번 장에서는 정규식을 이용하는 방법이 아닌 문자열을 다루는 방법에 조금 더
			 * 익숙해지기 위해 문자열 함수들을 이용하도록 하겠습니다.
			 * 앞부분의 코드들은 [] 사이의 내용을 title로 추출한 부분이며,
			 * 뒷부분의 코드들은 () 사이의 내용을 link로 뽑는 부분입니다.
			 * 뽑은 코드는 배열 형태로 CrawlData에 넣게 됩니다.
			 */
				let str = index_data[i].text;
				str = str.substr(str.indexOf("[") + 1);
				let temp_idx = str.indexOf("]");
				let title = str.substr(0, temp_idx);
	
				str = str.substr(temp_idx + 1);
				let link = str.slice(1, -1);
	
				CrawlData.push({
					'title' : title,
					'link' : link
				});
			}
		}
		//얻은 데이터를 화면에 출력합니다.
		console.log(CrawlData);
	});
}).on('error', (e) => {
	console.log("Error : ", e);
});
