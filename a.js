const res = require('express/lib/response');

//const bookid=require('./index')
const { Pool } = require('pg');

const pool = new Pool({
    user: 'athira',
    host: 'postgresql-102261-0.cloudclusters.net',
    database: 'athira',
    password: 'athira13',
    port: 19935,
});
let count=1;
const inc = {
     bookid: function() {

    return count+1;
}
}

const bookingroom=(req,res)=>{
   
   // let bid=bookid.bookid;
   let bookkid=3
    const userid=req.body.userid;
    const category=req.body.category;
    const bed=req.body.bed;
    const type=req.body.type;
    const checkin=req.body.checkin;
    const checkout=req.body.checkout;
    pool.query(
        "select * from room where category=$1 and bed=$2 and type=$3 and available='Yes'",[category,bed,type],(err,response)=>{
            if(err) res.send({
                status:" booking failed",
                    msg:"No rooms available!"
            });

            //console.log(bookid.bookid);
            if(response.rows.length!=0){
                pool.query(
                    "select max(bookingid) from booking",(err,response)=>{
                        if(err){
                            throw err
                        }
                         bookkid=response.rows[0].bookingid;
                         bookkid=bookkid+1;
                        res.send({
                            status:"Success",
                            msg:" bookidSuccess",
                       });
                    }
                )
                // const bid=inc.bookid();
                // console.log(bid);
                pool.query("insert into booking values ($1,$2,$3,$4,$5)",[bookkid,userid,response.rows[0].roomno,checkin,checkout],(err,results)=>{
                    if(err){
                        throw err
                    }
                    //console.log(bookid.bookid);
                   // bookid.bookid=bookid.bookid+1;
                    res.send({
                       
                        msg:"successfully booked \nBooking id :"+bid,
                    });
                })
                pool.query("update room set available='No'where roomno=$1",[response.rows[0].roomno],(err,results)=>{
                    if(err){
                        throw err
                    }
                
                    res.send({
                       
                         status:"Success",
                         msg:"Success",
                    });
                    
                })
                
            }
            
    

        }
    )

}

const vacateroom=(req,res)=>{
    const bid=req.body.bid;
    const userid=req.body.userid;
    
    pool.query(
        "select * from booking where bookingid=$1 and userid=$2",[bid,userid],(err,response)=>{
            if(err) res.send({
                status:" Failed",
                    msg:"No such booking"
            });


            if(response.rows.length!=0){
                
                pool.query("update room set available='Yes' where roomno=$1",[response.rows[0].roomno],(err,results)=>{
                    if(err){
                        throw err
                    }
                
                    res.send({
                       
                         status:"Success",
                         msg:"Successfully vacated!",
                    });
                    
                })
                
            }
            
    

        }
    )

}



module.exports={
    bookingroom,
    vacateroom,
}