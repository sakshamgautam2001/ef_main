const { Pool }=require('pg')

const pool = new Pool({
    ssl:{ rejectUnauthorized: false },
    connectionString:'postgres://hmerbtiuqtalng:f181d5a11a5cf6a40db8d46128de73f672cb5cf6178875e5288bf75e7b63b266@ec2-54-86-170-8.compute-1.amazonaws.com:5432/d95030s4s6j7fi',
  })


const getUsers=(req,res)=>{
    Query='select * from register'
    pool.query(Query,(err,resp)=>{
        if(err){
            throw err;
        }
        res.json(resp.rows)
    });
};

const userRegister=(req,res)=>{
     const dt=req.body;
     var Query="insert into register values('"+dt['name']+"','"+dt['email']+"','"+dt['phone']+"','"+dt['username']+"','"+dt['password']+"','user')"; 
     pool.query(Query,(err,result)=>{
         if(err){
             throw err;
         }
         res.send('registered');
     });

};
const login=(req,res)=>{
    const dt=req.body
    var Query="select * from register where username='"+dt['username']+"' and password='"+dt['password']+"'" ;
    pool.query(Query,(err,result)=>{
        if(err) {
            throw err;
        }
        res.send('Welcome to dashboard');
        console.log(result.rows);
    });
    
}

module.exports={
    userRegister,
    getUsers,
    login,
}