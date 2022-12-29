const res = require('express/lib/response');//package
const { Pool } = require('pg');

const pool = new Pool({
    user: 'athira',
    host: 'postgresql-102261-0.cloudclusters.net',
    database: 'athira',
    password: 'athira13',
    port: 19935,
});//connection establish


const signup=(req,res)=>{
    const id=req.body.id;
    const name=req.body.name;
    const age=req.body.age;
    const ad=req.body.ad;
    const ph=req.body.phone;
    const email=req.body.email;
    const pass=req.body.pass;
    pool.query("insert into customer values ($1,$2,$3,$4,$5,$6,$7) ",[id,name,age,ad,ph,email,pass],(err,results)=>{
        if(err){
            throw err
        }
        res.send("successfully added customer")
    })
}

const login=(req,res)=>{
    const email=req.body.email;
    const pass=req.body.pass;
    pool.query(
        "select * from customer where email=$1",[email],(err,response)=>{
            if(err) res.send(err);

            if(response.rows.length==0){
                return res.send({
                    status:"failed",
                    msg:"0invalid login",
                });
            }
            if(pass==response.rows[0].pass){
                res.send({
                    status:"Success",
                    user:response.rows[0],
                });
            }else{
                res.send({
                    status:"failed",
                    msg:"invalid login"
                });
            }

        }
    )
}



const cancelbooking=(req,res)=>{
    const ID=req.body.bid;
    const cid=req.body.cid;
    pool.query("delete from booking where bookingid=$1 and userid=$2",[ID,cid],(err,results)=>{
        if(err){
            throw err
        }

        res.send("successfully canceled your booking\n Booking id::"+ID);
    })
}

const getbooked=(req,res)=>{
    pool.query("select * from customer c ,booking b where c.id=b.userid",(err,results)=>{
        if(err){
            throw err
        }
       
        res.send(results.rows)
    })
}


module.exports={
    signup,
    login,   
    getbooked,
    cancelbooking
}


