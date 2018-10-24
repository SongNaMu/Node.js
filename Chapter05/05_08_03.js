const https = require('https');

let CrawlData = [];

const url = 'https://nodejs.org/dist/latest-v8.x/docs/api/';

//해당URL에서 데이터를 가져옵니다.
https.get(url + 'index.json', (res) => {
	let body ='';
	res.on('data', (d) => {
		body += d;
	});
	res.on('end', () => {
		//가져온 데이터를 JSON Object 형태로 변환하여 저장합니다.
		let index_data = JSON.parse(body).desc;

		//루프를 돌면서 페이지 데이터를 가져옵니다.
		for (let i = 0; i < index_data.length; i++){
			//해당 데이터의 type이 text일 경우에만 데이터를 분석합니다.
			if(index_data[i].type == 'text'){
				/*
사실 이부분은 정규표현식을 사용하면 좀 더 편리합니다.
하지만 이번 장에서는 그냥 진행하도록 합시다.
앞 부분의 코드들은 []사이의 내용을 title로 뽑는 부분이며,
뒷 부분의 코드들은 () 사이의 내용을 link로 뽑는 부분입니다.
뽑은 코드는 배열 형태로 CrawlData에 넣게 됩니다.
				*/
				let str = index_data[i].text;
				str = str.substr(str.indexOf("[") + 1);
				let temp_idx = str.indexOf("]");
				let title = str.substr( 0 , temp_idx);

				str = str.substr(temp_idx + 1);
				let link = str.slice(1, -1).replace(".html",".json");

				CrawlData.push({
					'title': title,
					'link': link,
					'methods': []
				});
			}
		}

		//얻은 데이터를 화면에 출력합니다.
		setTimeout(() => {
			GetMethod();
		}, 1000);
	});
}).on('error', (e) => {
	console.log("Error: " + e);
});
//해당 URL에서 데이터를 가져옵니다.
let page_idx = 0;
const GetMethod = () => {
	console.log( "Get Methods");
	https.get(url + CrawlData[page_idx].link, (res) => {
		let body = '';
		res.on('data', (d) => {
			body += d;
		});
		res.on('end', () => {
			//가져온 데이터를 JSON Object 형태로 변환하여 저장합니다.
			const temp = JSON.parse(body);

			//메서드를 사용하기 힘든 데이터는 저장하지 않습니다.
			if(!temp || !temp.modules || temp.modules.length == 0 || !temp.modules[0].methods){
				page_idx++;
				setTimeout(() => {
					GetMethod();
				}, 1000);
				return ;
			}
			let index_data = temp.modules[0].methods;

			//루프를 돌면서 메서드를 하나씩 확인합니다.
			for( let i = 0; i < index_data.length; i++){
				//개별 메서드에 대해서 필요한 만큼의 데이터를 읽어서 저장합니다.

				CrawlData[page_idx].methods.push({
					textRaw: index_data[i].textRaw,
					desc: index_data[i].desc,
					signatures: index_data[i].signatures
				});
			}

			//데이터를 불러오고 나면 다시 한번 호출합니다.
			if(page_idx < CrawlData.length -1 ){
				page_idx++;
				setTimeout(function(){
					GetMethod();
				}, 1000);
			}else{
				//화면으로 출력합니다.
				console.log(CrawlData);
			}
		});
	}).on('error', (e) => {
		console.log("Error : " + e);
	});
};
