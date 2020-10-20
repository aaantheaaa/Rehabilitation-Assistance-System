var mongoose=require('mongoose');
var express=require('express')
const session=require('express-session');
var app = express();
let fs = require('fs');
var path = require('path');
const port = process.env.PORT || 4000;
app.set('view engine', 'ejs');

var bodyParser=require('body-parser');
const { check, validationResult } = require('express-validator');
var Schema=require('./patientSchema');
var newbody = mongoose.model("latestcollection",Schema);
const TWO_HOURS=1000* 60 * 60 * 2
const{
    NODE_ENV='development',
    SESS_NAME='session',
    SESS_SECRET='secretcookie',
    SESS_LIFETIME=TWO_HOURS

}=process.env

const IN_PROD=NODE_ENV==='production '

app.use(express.static('public')); // Serves the JS and CSS files in the public folder

/*/ Routing
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/web/index.html'));
})
app.get('/index', function (req, res) {
    res.sendFile(path.join(__dirname + '/web/index.html'));
})
app.get('/programs', function(req, res) {
    res.sendFile(path.join(__dirname + '/web/programs.ejs'));
})
app.get('/patientDashboard', function(req, res) {
    res.sendFile(path.join(__dirname + '/web/patientDashboard.ejs'));
})
app.get('/doctors', function(req, res) {
    res.sendFile(path.join(__dirname + '/web/doctors.ejs'));
})
app.get('/signin', function(req, res) {
    res.sendFile(path.join(__dirname + '/web/signin.ejs'));
})
app.get('/signup', function(req, res) {
    res.sendFile(path.join(__dirname + '/web/signup.ejs'));
})
app.get('/train.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/web/train.html'));
})
app.get('/practitionerAllocate.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/web/practitionerAllocate.html'));
})
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/web/404.ejs'));
})
*/
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

    app.get('/',(req,res)=>{
        res.render('index');
       })
   
    app.get('/login',(req,res)=>{
     res.render('signin');
    })

    app.get('/home',(req,res)=>{
        res.render('index');
       })

    app.get('/register',(req,res)=>{
        res.render('signup');
    })

    app.get('/programs',(req,res)=>{
        res.render('programs');
    })

    app.get('/doctors',(req,res)=>{
        res.render('doctors');
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
                            res.redirect('/home')
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
                res.redirect('/login');
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
                        return res.redirect('/home');                    
                    }
                })            
        })


        app.get('/patientDashboard' ,redirectLogin,(req,res)=>{
            newbody.findOne({email:req.session.userId})
            .then((patient)=>{
                res.render('patientDashboard',{patient:patient});
            })
        })



        app.post('/logout',redirectLogin,(req,res)=>{
            req.session.destroy(err=>{
                // console.log("error");
            if(err){
                return res.redirect('/login');
            }
        res.clearCookie(SESS_NAME);
        res.redirect('/login');

        })
        })

var server = app.listen(port, function() {
    var host = server.address().address
    var port = server.address().port

    console.log("App listening at http://%s:%s", host, port)
})
