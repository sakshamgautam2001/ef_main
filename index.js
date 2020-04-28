const express=require("express");
const engine=require('ejs-locals') ;
const path=require('path') ;
const passport = require('passport');

// const Request=require('request');

const app=express() ;
const http=require('http');
const server=http.Server(app);

app.use(require('express-session')({ secret: "hello", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const bodyParser=require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false })


app.engine('ejs',engine) ;
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/assets',express.static('assets'));

const dataq=require('./queries')




app.get('/',(req,res)=>{
    res.render('home');
});

app.get('/pricing',(req,res)=>{
    res.render('pricing')
});
app.get('/faq',(req,res)=>{
    res.render('faq')
});
app.get('/services',(req,res)=>{
    res.render('services')
});
app.get('/service',(req,res)=>{
    res.render('service')
});
app.get('/register',(req,res)=>{
    res.render('register')
});
app.get('/login',(req,res)=>{
    res.render('login')
});
app.post('/register',urlencodedParser,dataq.userRegister);
app.get('/show',urlencodedParser,dataq.getUsers);
app.post('/login',urlencodedParser,dataq.login);

app.get('/sign/google',dataq.googleSign);
app.get('/log/google',dataq.googleLogin);
app.get('/returnplatform',dataq.returnPlatform,dataq.returnPlatform2);
app.get('/return-account',dataq.returnAccount);






server.listen(process.env.PORT || 7500,'0.0.0.0',()=>{
    //console.log(app.get('views'))
    
    console.log(`Express running→PORT 7500`);
});