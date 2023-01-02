const res = require('express/lib/response');


const { Pool } = require('pg');

const pool = new Pool({
    user: 'athira',
    host: 'postgresql-102261-0.cloudclusters.net',
    database: 'athira',
    password: 'athira13',
    port: 19935,
});


const bookingroom = async(req, res) => {


    let bookkid = 0
    const userid = req.body.userid;
    const category = req.body.category;
    const bed = req.body.bed;
    const type = req.body.type;
    const checkin = req.body.checkin;
    const checkout = req.body.checkout;
    const no = req.body.no;
    const avail = 'yes'
    pool.query(
        "select * from room where category=$1 and bed=$2 and type=$3 and available=$4", [category, bed, type, avail],async(err, response) => {
           
            if (response.rows.length < no)
                return res.send({
                    status: " booking failed",
                    msg: "No rooms available!"
                });


            if (response.rows.length >= no) {
                let i = 0;
                const a = [];

                await pool.query("select max(bookingid) from booking", async(error, respond) => {
                    if (error) {
                        throw error;
                    }
                    bookkid = respond.rows[0].max;
                    while (i < no) {
                        bookkid = bookkid + 1;
                       
                      
                      
                       
                       await pool.query("insert into booking values ($1,$2,$3,$4,$5)", [bookkid, userid, response.rows[i].roomno, checkin, checkout]).then(async(result1)=>{
                                 await pool.query("update room set available='No'where roomno=$1", [response.rows[i].roomno]).then((result2)=>{
                                    a[i]=bookkid
                                   i++;
                                   if(i==no)
                                   res.send({

                                    status: "Success",
                                    msg: "Successfully booked ::",
                                    Booking_id:a
                                });
                                }) 
                           
                       
                       }) 
                
                        
                        
                    }
                    
                }

                )

              
        



            }
        }
    )

}

const vacateroom = (req, res) => {
    const bid = req.body.bid;
    const userid = req.body.userid;

    pool.query(
        "select * from booking where bookingid=$1 and userid=$2", [bid, userid], (err, response) => {
            if (err) res.send({
                status: " Failed",
                msg: "No such booking"
            });


            if (response.rows.length != 0) {

                pool.query("update room set available='Yes' where roomno=$1", [response.rows[0].roomno], (err, results) => {
                    if (err) {
                        throw err
                    }

                    res.send({

                        status: "Success",
                        msg: "Successfully vacated!",
                    });

                })

            }



        }
    )

}



module.exports = {
    bookingroom,
    vacateroom,
}