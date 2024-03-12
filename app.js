// basic integration

const express =require('express');
const router = require('./src/routes/api');
const app = new express();
const bodyParser = require('body-parser');
 

// security middle ware

const rateLimit = require('express-rate-limit');
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp  = require('hpp');
const cors  = require('cors');

// databases

const mongoose = require('mongoose');

// security middleware implementation

app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

//body parser implement

app.use(bodyParser.json())

//request rate limit

rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)

//mongodb connection
let URI = "mongodb://localhost:27017/Todo";
let OPTION ={user: '', pass:'',autoIndex:true}
mongoose.connect(URI,OPTION,(error)=>{
  console.log("connection success")
  console.log(error)

})


//routing implement
app.use("/api/v1",router)

//undefined route implement

app.use("*",(req,res)=>{
  res.status(404).json({status:"fail",data: "Not found"})
})

module.exports=app;
