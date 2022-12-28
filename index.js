const express=require('express');
const bodyParser=require('body-parser')
const query=require('./q.js')
const app=express();
const port=3000
app.use(bodyParser.json())

app.get('/createt',query.createuser);
app.get('/booking',query.createbooking);
app.post('/signup',query.signup);
app.post('/login',query.login);
app.post('/bookingdata',query.getbooking);
app.get('/listbooked',query.getbooked);
app.get('/cancel',query.cancelbooking);
app.listen(port,()=>{
    console.log("App running")
});