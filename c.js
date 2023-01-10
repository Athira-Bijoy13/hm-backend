const { response } = require('express');
const res = require('express/lib/response');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'user',
    host: 'postgresql-104336-0.cloudclusters.net',
    database: 'hotel',
    password: 'athira13',
    port: 10006,
});
const contact=(req,res)=>
{
 pool.query(
    "select staffname,position,phno from staff ",(err,response)=>
    {
        if(err)
        {
            throw err;
        }
        res.send({
            status:"success",
            staff:response.rows
    })
    }
 )   
}
const reviews_display=(req,res)=>
{
    
    pool.query(
        "select c.name,r.rating,r.description from customer as c,review as r where c.id=r.userid",(err,response)=>
        {
            if(err)
            {
                throw err;
            }
            res.send({
                status:"success",
                review:response.rows
        })
        }
    )
}

module.exports={
   contact,
   reviews_display
}