const res = require('express/lib/response');


const { Pool } = require('pg');

const pool = new Pool({
    user: 'user',
    host: 'postgresql-104336-0.cloudclusters.net',
    database: 'hotel',
    password: 'athira13',
    port: 10006,
});


const bookingroom=(req,res)=>{
   
  
     let bookkid
    const userid=req.body.userid;
    const category=req.body.category;
    const bed=req.body.bed;
    const type=req.body.type;
    const checkin=req.body.checkin;
    const checkout=req.body.checkout;
    const avail="yes"
    console.log(category,bed,type)
    pool.query(
        "select * from room where category=$1 and bed=$2 and type=$3 and available=$4",[category,bed,type,avail],(err,response)=>{
            console.log(response.rows.length)
            if(response.rows.length==0) 
            {
                console.log(response.rows.length)
                res.send({
                status:" booking failed",
                    msg:"No rooms available!"
            });
        }

            
            else if(response.rows.length!=0){
                pool.query(
                    "select max(bookingid) from booking",(error,respond)=>{
                        if(error){
                            throw error;
                        }
                        bookkid=respond.rows[0].max;
                        bookkid=bookkid+1;
            
                           pool.query("insert into booking values ($1,$2,$3,$4,$5)",[bookkid,userid,response.rows[0].roomno,checkin,checkout],(error2,results)=>{
                               if(error2){
                                   throw error2
                               }
                               
                           })
                           pool.query("update room set available='No'where roomno=$1",[response.rows[0].roomno],(error3,resultsff)=>{
                               if(error3){
                                   throw error3
                               }
                           
                               res.send({
                                  
                                    status:"Success",
                                    msg:"Successfully booked :: Booking id :"+bookkid,
                               });
                               
                           })
                    }
                )
               
                
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