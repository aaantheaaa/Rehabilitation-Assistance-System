var express = require('express');
var app = express();
let fs = require('fs');
var path = require('path');
const port = process.env.PORT || 8081;

//database connection---------------------------------------
const expressHandlebars = require("express-handlebars");
const bodyparser = require("body-parser");
const connection = require("./model/connection");
const patientController = require("./controller/patients")

app.use(bodyparser.urlencoded({
    extended: true
}));

app.set('views',path.join(__dirname,"/web/"));
app.engine("hbs",expressHandlebars({
    extname: "hbs",
    defaultLayout: "mainlayout",
    layoutDir : __dirname + "/web/in"
}));

app.set("view engine", "hbs");

app.get("/",(req,res)=>{
    //res.send('<h1>hello world<h1>');
    res.render("in",{});
});

app.use("/patient",patientController);

//------------------------------------------------------@seul

app.use(express.static('public'));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/web/index.html'));
})
app.get('/index.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/web/index.html'));
})
app.get('/programs.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/web/programs.html'));
})
app.get('/patientDashboard.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/web/patientDashboard.html'));
})
app.get('/doctors.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/web/doctors.html'));
})
app.get('/signin.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/web/signin.html'));
})
app.get('/signup.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/web/signup.html'));
})
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/web/404.html'));
})
var server = app.listen(port, function() {
    var host = server.address().address
    var port = server.address().port

    console.log("App listening at http://%s:%s", host, port)
})

/*
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
    } else if (req.url === '/patientDashboard.html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream(__dirname + '/web/patientDashboard.html').pipe(res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        fs.createReadStream(__dirname + '/web/404.html').pipe(res);
    }
}).listen(PORT);

*/