var express = require('express');
var app = express();
let fs = require('fs');
var path = require('path');
const port = process.env.PORT || 8081;

app.use(express.static('public')); // Serves the JS and CSS files in the public folder

// Routing
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
app.get('/practitionerDashboard.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/web/practitionerDashboard.html'));
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
app.get('/train.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/web/train.html'));
})
app.get('/practitionerAllocate.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/web/practitionerAllocate.html'));
})
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/web/404.html'));
})
var server = app.listen(port, function() {
    var host = server.address().address
    var port = server.address().port

    console.log("App listening at http://%s:%s", host, port)
})
