const express=require("express");
const engine=require('ejs-locals') ;
const path=require('path') ;


// const Request=require('request');

const app=express() ;
const http=require('http');
const server=http.Server(app);


app.engine('ejs',engine) ;
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/assets',express.static('assets'));




app.get('/',(req,res)=>{
    res.render('home')
});

server.listen(process.env.PORT || 7500,'0.0.0.0',()=>{
    //console.log(app.get('views'))
    
    console.log(`Express running→PORT 7500`);
});