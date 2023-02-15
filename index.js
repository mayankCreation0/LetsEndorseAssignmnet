const express = require('express');
const mongoose = require('mongoose');
const routers = require('./Router/userRoutes')
const route= express.Router();
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());
app.use('/',routers),
route.get('/', (req,res)=>{
    res.send("Server is Live")
})
port = process.env.PORT || 3030;
mongoose.set("strictQuery",true);
mongoose.connect(process.env.DATA_URl)
.then(()=>{
    console.log("listen")
}).catch((err)=>{
    console.log(err);
})
app.listen(port, () => {
    console.log(`server listening on ${port}`);
})