const fs = require('fs');
const http = require('http');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

const index_page = fs.readFileSync('./index.ejs', 'utf8');
const other_page = fs.readFileSync('./other.ejs', 'utf8');
const style_css = fs.readFileSync('./style.css', 'utf8');

let server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server start!');

function getFromClient(request, response) {
	let url_parts = url.parse(request.url, true);
	switch (url_parts.pathname) {

		case '/':
			response_index(request, response);
			break;
			
		case '/other':
			response_other(request, response);
			break;

		case '/style.css':
			response.writeHead(200, { 'Content-Type': 'text/css' });
			response.write(style_css);
			response.end();
			break;

		default:
			response.writeHead(200, {'Content-Type': 'text/plain'});
			response.end('no page....');
			break;
	}
      
}

function response_index(request, response) {
	var msg = "これはIndexページです！"
	var content = ejs.render(index_page, {
		title:"Index",
		content:msg,
	});
	response.writeHead(200, { 'Content-Type': 'text/html' });
	response.write(content);
	response.end();
}

function response_other(request, response) {
	var msg = "これはOtherページです"
	if(request.method == 'POST') {//.methodで、リクエストの方式を調べる。
		var body = '';

		//オブジェクト.on（イベント名, 関数）でイベント発生の処理。
		//オブジェクトにイベントに応じて呼び出される関数を設定する事が出来る。
		//dataイベントは、クライアントからデータを受け取ると発生するイベント。
		request.on('data', (data) => {
			body += data;
		});

		//データの受け取りが完了したら発生するイベント。
		request.on('end', () => {
			var port_data = qs.parse(body); //受け取ったデータのエンコード＝パースして使える様にしている。
			msg += 'あなたは、「' + port_data.msg + '」と書きました。';
			var content = ejs.render(other_page, {
				title:'Other',
				content:msg,
			});
			response.writeHead(200, { 'Content-Type': 'text/html' });
			response.write(content);
			response.end();
		});
	} else {
		var msg = "ページがありません"
		var content = ejs.render(other_page, {
			title:'Other',
			content:msg,
		});
		response.writeHead(200, { 'Content-Type': 'text/html' });
		response.write(content);
		response.end();
	}
}