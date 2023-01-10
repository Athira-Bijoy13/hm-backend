const res = require('express/lib/response');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'user',
    host: 'postgresql-104336-0.cloudclusters.net',
    database: 'hotel',
    password: 'athira13',
    port: 10006,
});

const bookinghistory=(req,res)=>
{
    const userid=req.body.userid;

pool.query(
  "  select r.category,r.type,b.checkindate,r.roomno from room as r,booking as b where b.userid=$1 and b.roomno=r.roomno",[userid],(err,response)=>
  {
    if(err){
        throw err
    }
    res.send(
        response.rows
    )
  }
)
}



const addreview=(req,res)=>{
    const userid=req.body.userid;
    const desc=req.body.desc;
    const rating=req.body.rating;

    pool.query(
        "insert into review values($1,$2,$3)",[userid,desc,rating],(err,response)=>{
            if(err)
                throw err
            res.send({
                status:"Sucess",
                msg:"Successfully added review"
            })
        }
    )
}
module.exports={
    bookinghistory,
    addreview
}