const { Pool }=require('pg')

const pool = new Pool({
    ssl:{ rejectUnauthorized: false },
    connectionString:'postgres://hmerbtiuqtalng:f181d5a11a5cf6a40db8d46128de73f672cb5cf6178875e5288bf75e7b63b266@ec2-54-86-170-8.compute-1.amazonaws.com:5432/d95030s4s6j7fi',
  });


const passport = require('passport');
const StrategyGoogle=require('passport-google-oauth').OAuth2Strategy
const {StrategyFacebook}=require('passport-facebook')


const getUsers=(req,res)=>{
    Query='select * from users'
    pool.query(Query,(err,resp)=>{
        if(err){
            throw err;
        }
        res.json(resp.rows)
    });
};

const userRegister=(req,res)=>{
     const dt=req.body;
     var Query="insert into users values('"+dt['name']+"','"+dt['phone']+"','"+dt['email']+"','"+dt['password']+"','manual')"; 
     pool.query(Query,(err,result)=>{
         if(err){
             throw err;
         }
         res.send('registered');
     });
};
const login=(req,res)=>{
    const dt=req.body
    var Query="select * from users where username='"+dt['username']+"' and password='"+dt['password']+"'" ;
    pool.query(Query,(err,result)=>{
        if(err) {
            throw err;
        }
        if(result.rowCount==1){
            res.send('welcome to dashboard')
        }
        else{
            res.send('incorrect email or password')
        }
    });
}


//Google Authentication

options={
        clientID:'293743718281-5296afkh4lsilt2upb9a4ib2pqb2bj7f.apps.googleusercontent.com',
        clientSecret:'eTI3X-VmMvRxHnMZkQErrUtP',
        callbackURL:'/returnplatform'
        };


passport.use(new StrategyGoogle(options,(accessToken,refreshToken,profile,cb)=>{
        // console.log(profile)
        return cb(null,profile);
    }
));


passport.serializeUser((user,cb)=>{
    cb(null,user);
});
passport.deserializeUser((obj,cb)=>{
    cb(null,obj);
});

const googleSign=passport.authenticate('google',{scope:['profile','email']});
const googleLogin=passport.authenticate('google',{scope:['email']});
const returnPlatform=passport.authenticate('google',{failureRedirect:'/register'});
const returnPlatform2=(req,res,next)=>{
    // console.log('done')
    res.redirect('/return-account');
};


const returnAccount=(req,res)=>{
    const data=req.user
    var name=data.displayName
    var userid=data.emails[0].value

    if(name){
        Query="insert into users(name,userid,platform) values('"+name+"','"+userid+"','gmail')"
        pool.query(Query,(err,result)=>{
            if(err) throw err;
            res.send('registered');
        });
    }
    else{
        Query="select * from users where userid='"+userid+"'";
        pool.query(Query,(err,result)=>{
            if(err) throw err;
            if(result.rowCount==1){
                res.send('welcome to dashboard')
            }
            else{
                res.send('this email is not registered')
            }
        });
    }
}









module.exports={
    userRegister,
    getUsers,
    login,
    googleSign,
    googleLogin,
    returnPlatform,
    returnPlatform2,
    returnAccount,
}