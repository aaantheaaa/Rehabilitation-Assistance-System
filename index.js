const PORT = process.env.PORT;
var http = require('http');
let fs = require('fs');

http.createServer(function (req, res) {
    if (req.url === '/index.html' || req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream(__dirname + '/web/index.html').pipe(res);
    } else if (req.url === '/programs.html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream(__dirname + '/web/programs.html').pipe(res);
    } else if (req.url === '/doctors.html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream(__dirname + '/web/doctors.html').pipe(res);
    } else if (req.url === '/signin.html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream(__dirname + '/web/signin.html').pipe(res);
    } else if (req.url === '/signup.html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream(__dirname + '/web/signup.html').pipe(res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        fs.createReadStream(__dirname + '/web/404.html').pipe(res);
    }
}).listen(PORT);