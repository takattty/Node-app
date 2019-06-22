const http = require('http');
const fs = require('fs');

var server = http.createServer(
    (request, response) => {
        fs.readFile('./index.html', 'UTF-8', 
        (err, date) => {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(date);
            response.end();
        });
    }
);

server.listen(3000);
console.log('Server start!');