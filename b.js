const res = require('express/lib/response');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'athira',
    host: 'postgresql-102261-0.cloudclusters.net',
    database: 'athira',
    password: 'athira13',
    port: 19935,
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
module.exports={
    bookinghistory
}