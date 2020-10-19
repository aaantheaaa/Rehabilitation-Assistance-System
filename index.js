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

    app.get('/',redirectLogin,(req,res)=>{
        const{userId}=req.session;
        console.log(req.session);
        res.send(`IN HOME PAGE`
        )
    })
            app.get('/admin',(req,res)=>{
                var error=[]
                res.render('admin',{error})
            })
                app.post('/admin',(req,res)=>{
                    var email=req.body.email;
                    var password=req.body.password;
                     console.log(email +"  "+ password)
                        if(req.body.email==="doctor@gmail.com"){
                               newbody.findOne({email:req.body.email})
                                .then((patient)=>{
                               if( patient ){
                                    if(patient.password === req.body.password ){
                                        console.log('admin authenticated');
                                         req.session.userId=req.body.email;
                                        newbody.find()
                                        .then((details=>{
                                            console.log(details)
                                            var error=[];
                                           res.render('adminhtml',{details});
                                        })

                                        )}
                                
                                    else{
                                        var error=[];
                                        error.push("Incorrect password");
                                        console.log('incorrect password')
                                        res.render("admin",{error});
                                    }
                               }
                               else{
                                    // res.send({emailError: "incorrectEmail"})
                                    var error=[];
                                    error.push("Email does does not exist");
                                    console.log('Admin email doesnot match');
                                    res.render("admin",{error});
                               }
                            })
                             
            
                        }else{
                            res.render('notadmin'); 
                        }
            
                })
    app.get('/login',(req,res)=>{
     res.render('signin');
    })

    app.get('/register',(req,res)=>{
        res.render('register');
    })
    

app.post('/login',(req,res)=>{
console.log("in post login ");
        var email=req.body.email;
        var password=req.body.password;
        // console.log(email +"  "+ password)
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
                //     if(user){
                //         console.log("this is a user");
                //         req.session.userId=req.body.email;
                //    return res.redirect('/home');
                //     }

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
                
                // newbody.findOne({email:req.body.email},function(err,alldetails){
                //     if(err)
                //     {
                //         console.log(err);
                //     }
                //     if(alldetails){     
                     
                //         console.log('User already exist');
                    
                //     }
                    //     else{
                    //     var sData = new newbody()
                    //     sData.name = name
                    //     sData.email= email
                    //     sData.password = password
                    //     sData.save()
                    //     req.session.userId=req.body.email;
                    //     console.log("DATA SAVED IN DATABASE");              
                    //     return res.redirect('/home');                    
                    // }
            // })
        })
        app.get('/home' ,redirectLogin,(req,res)=>{
            newbody.findOne({email:req.session.userId})
            .then((patient)=>{
                res.render('home.ejs',{patient:patient});
          
            //         res.send(`
            //     <h1>HOME</h1>
            //     <ul>
            //     <li> NAME: ${patient.name}</li>
            //     <li> EMAIL ${patient.email}</li>
            //     </ul>
            // <form action='/logout' method="post">
            // <button>LOGOUT</button>
            // </form>
            // `)
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
