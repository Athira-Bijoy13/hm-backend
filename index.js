const express=require('express');
const bodyParser=require('body-parser')
const query=require('./q.js')
const query1=require('./a.js')
const query2=require('./b.js')
const query3=require('./c.js')
const app=express();
const port=3000
app.use(bodyParser.json())

app.get('/bookinghistory',query2.bookinghistory);
app.get('/bookroom',query1.bookingroom);
app.get('/vacateroom',query1.vacateroom);
app.get('/contact',query3.contact);
app.get('/reviews',query3.reviews_display);
app.post('/signup',query.signup);
app.post('/login',query.login);
app.post('/addreview',query2.addreview);
app.get('/listbooked',query.getbooked);
app.get('/cancel',query.cancelbooking);
app.listen(port,()=>{
    console.log("App running")
});
