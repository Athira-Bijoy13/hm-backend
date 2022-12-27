const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'athira',
    password: 'athira13',
    port: 5432,
});


const createuser=(req,res)=>{
    pool.query("create table customer(id int primary key,fname varchar(10) not null,lname varchar(10),age int,address varchar(20),phone varchar(10),no_of_guests int)",(err,results)=>{
        if(err){
            throw err
        }
       
        res.send(results.rows)
    })
}


const gettestdata=(req,res)=>{
    var a=3
    //req.body.a
    var b='rrr'
    pool.query("insert into customer values (1001,'Raj','M',30,'kjhnbg','6598674685',4) ",(err,results)=>{
        if(err){
            throw err
        }
        res.send(results.rows)
    })
}

module.exports={gettestdata,createuser}


//