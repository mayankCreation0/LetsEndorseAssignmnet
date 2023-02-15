const express = require('express');
const mongoose = require('mongoose');
const routers = require('./Router/userRoutes')
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());
app.use('/',routers),

port = process.env.PORT || 3030;
mongoose.set("strictQuery",true);
mongoose.connect(process.env.DATA_URl)
.then(()=>{
    app.listen(port,()=>{
        console.log(`server listening on ${port}`);
    })
}).catch((err)=>{
    console.log(err);
})