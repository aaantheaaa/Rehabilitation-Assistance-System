var express = require('express');
var express=require('express')
const session=require('express-session');
var app = express();
let fs = require('fs');
var path = require('path');
const port = process.env.PORT || 8081;
app.set('view engine', 'ejs');

var bodyParser=require('body-parser');
const { check, validationResult } = require('express-validator');
var Schema=require('./userSchema');
var newbody = mongoose.model("latestcollection",Schema);
const TWO_HOURS=1000* 60 * 60 * 2
const{
    NODE_ENV='development',
    SESS_NAME='session',
    SESS_SECRET='secretcookie',
    SESS_LIFETIME=TWO_HOURS

}=process.env

const IN_PROD=NODE_ENV==='production '

app.use(express.static('public'));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/web/index'));
})
app.get('/index.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/web/index'));
})
app.get('/programs.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/web/programs'));
})
app.get('/patientDashboard.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/web/patientDashboard'));
})
app.get('/doctors.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/web/doctors'));
})
app.get('/signin.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/web/signin'));
})
app.get('/signup.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/web/signup'));
})
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/web/404'));
})

app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(bodyParser.json());

        const redirectLogin=(req,res,next)=>{
            if(!req.session.userId){
                console.log("redirecting to /login by middleware redirectlogin");
                res.redirect('/login');
            }else{
                next();
            }
        }

    const redirectHome=(req,res,next)=>{
            if(req.session.userId){
                console.log("redirecting to /home by home middleware")
                res.redirect('/home')
            }else{
                next();
            }

    }
 
    app.use(session({
        name:SESS_NAME,
        resave:false,
        saveUninitialized:false,
        secret:SESS_SECRET,
        cookie : {
            maxAge:SESS_LIFETIME,
            sameSite:true,
            secure:IN_PROD,
        }
    }))

    app.get('/login',(req,res)=>{
     res.render('signin');
    })

    app.get('/register',(req,res)=>{
        res.render('signup');
    })
    

app.post('/login',(req,res)=>{
console.log("in post login ");
        var email=req.body.email;
        var password=req.body.password;
            if(email && password){
                console.log("finding " + email + " in database");
                   newbody.findOne({email:req.body.email})
                .then((patient)=>{
                   if( patient ){
                        if(patient.password === req.body.password ){
                            console.log('user authenticated');
                            req.session.userId=req.body.email;
                            res.redirect('/index')
                        }
                        else{
                            res.send({passwordError: "incorrectPassword"})
                            console.log('incorrect password')
                        }
                   }else{
                    res.send({emailError: "incorrectEmail"})
                       console.log('User not found with this email')
                   }
                })

            }else{
                res.redirect('/signin');
            }

})

        app.post('/register',(req,res)=>{
            console.log("in post register");
            var name=req.body.name;
            var email=req.body.email;
            var password=req.body.password;
                console.log(name +" "+ email +" "+password);
                newbody.findOne({email:req.body.email})
                .then((patient)=>{
                    if(patient){
                      res.send({usererror: "Userexists"})
                    }
                    else{
                        var sData = new newbody()
                        sData.name = req.body.name
                        sData.email= req.body.email
                        sData.password = req.body.password
                        sData.save()
                        req.session.userId=req.body.email;
                        console.log("DATA SAVED IN DATABASE");              
                        return res.redirect('/index');                    
                    }
                })            
        })
        app.get('/index' ,redirectLogin,(req,res)=>{
            newbody.findOne({email:req.session.userId})
            .then((patient)=>{
                res.render('index.ejs',{patient:patient});
            })
            
        })

        

        app.post('/logout',redirectLogin,(req,res)=>{
            req.session.destroy(err=>{
                // console.log("error");
            if(err){
                return res.redirect('/signin');
            }
        res.clearCookie(SESS_NAME);
        res.redirect('/signin');

        })
        })

var server = app.listen(port, function() {
    var host = server.address().address
    var port = server.address().port

    console.log("App listening at http://%s:%s", host, port)
})
