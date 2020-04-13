const { Pool }=require('pg')

let pool

if(process.env.DATABASE_URL){
        pool=new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    });
}
else{
    pool=new Pool();
}


const getUsers=(req,res)=>{
    Query='select * from table1'
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

module.exports={
    userRegister,
    getUsers,
}