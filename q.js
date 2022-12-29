const res = require('express/lib/response');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'athira',
    host: 'postgresql-102261-0.cloudclusters.net',
    database: 'athira',
    password: 'athira13',
    port: 19935,
});


const createuser=(req,res)=>{
    pool.query("create table customer(id int primary key,fname varchar(10) not null,lname varchar(10),age int,address varchar(20),phone varchar(10),no_of_guests int)",(err,results)=>{
        if(err){
            throw err
        }
       
        res.send(results.rows)
    })
}
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
const createbooking=(req,res)=>{
    pool.query("create table booking(bid int primary key,userid int,room int,checkin date,checkout date,foreign key(userid) references customer(id))",(err,results)=>{
        if(err){
            throw err
        }
       
        res.send(results.rows)
    })
}

const getbooking=(req,res)=>{
    const bid=req.body.bid;
    const userid=req.body.userid;
    const room=req.body.room;
    const checkin=req.body.checkin;
    const checkout=req.body.checkout;

    
    pool.query("insert into booking values ($1,$2,$3,$4,$5)",[bid,userid,room,checkin,checkout],(err,results)=>{
        if(err){
            throw err
        }
        res.send("successfully booked \nBooking id :"+bid);
    })
}
const cancelbooking=(req,res)=>{
    const ID=102;
    const cid=1002;
    pool.query("delete from booking where bid=101 and userid=1001",(err,results)=>{
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
    createuser,
    login,
    createbooking,
    getbooking,
    getbooked,
    cancelbooking
}


//