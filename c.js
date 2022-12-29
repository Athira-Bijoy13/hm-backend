const { response } = require('express');
const res = require('express/lib/response');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'athira',
    host: 'postgresql-102261-0.cloudclusters.net',
    database: 'athira',
    password: 'athira13',
    port: 19935,
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
        res.send(
            response.rows
        )
    }
 )   
}
module.exports={
   contact
}