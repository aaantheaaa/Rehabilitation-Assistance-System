const PORT = process.env.PORT;
var http = require('http');

http.createServer(function (req, res) {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    fs.readFile('index.html', null, function (error, data) {
        if (error) {
            response.writeHead(404);
            respone.write('Whoops! File not found!');
        } else {
            response.write(data);
        }
        response.end();
    });
}).listen(PORT);