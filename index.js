const express=require('express');
const bodyParser=require('body-parser')
const query=require('./q.js')
const query1=require('./a.js')
const app=express();
const port=3000
app.use(bodyParser.json())


app.get('/bookroom',query1.bookingroom);
app.get('/vacateroom',query1.vacateroom);
app.post('/signup',query.signup);
app.post('/login',query.login);
app.post('/bookingdata',query.getbooking);
app.get('/listbooked',query.getbooked);
app.get('/cancel',query.cancelbooking);
app.listen(port,()=>{
    console.log("App running")
});