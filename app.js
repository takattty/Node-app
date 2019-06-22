const fs = require('fs');
const http = require('http');

let server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server start!');

function getFromClient(req, res) {
  request = req;
  response = res;
    fs.readFile('./index.html', 'UTF-8',
      (err, date) => {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(date);
        response.end();
      });
};