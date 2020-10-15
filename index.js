const PORT = process.env.PORT;
var http = require('http');
let fs = require('fs');

http.createServer(function (req, res) {
    if (req.url === 'https://rehabilitation-iot2020.herokuapp.com//index.html' || req.url === 'https://rehabilitation-iot2020.herokuapp.com//') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream(__dirname + './web/index.html').pipe(res);
    } else if (req.url === '/programs.html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream(__dirname + './web/programs.html').pipe(res);
    } else if (req.url === '/doctors.html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream(__dirname + './web/doctors.html').pipe(res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        fs.createReadStream(__dirname + '/404.html').pipe(res);
    }
}).listen(PORT);