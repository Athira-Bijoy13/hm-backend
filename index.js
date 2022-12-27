const express=require('express');
const bodyParser=require('body-parser')
const query=require('./q.js')
const app=express();
const port=3000
app.use(bodyParser.json())

app.get('/createt',query.createuser);
app.get('/testdata',query.gettestdata);
app.listen(port,()=>{
    console.log("App running")
});