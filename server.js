const express = require('express');
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config({path: './Config/config.env'});

const route  = require('./routers/feeRouter')

const Database = process.env.DATABASE

const app = express();
app.use(express.json());
app.use("/api", route)

mongoose.set("strictQuery", true)

mongoose.connect(Database,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("MongooseDB Conneted ");
})

app.listen(process.env.PORT || 5000, ()=>{
    console.log('Conneted')
})