const express = require('express');

const routers = require('./Router/userRoutes')
const cors = require('cors');
const connect = require('./db/connect');
const app = express();
app.use(express.json());
app.use(cors());
app.use('/',routers),
app.get('/', (req,res)=>{
    res.send("Server is Live")
})
const port = process.env.PORT || 5000;
connect()
.then(()=>{
    console.log("listen")
}).catch((err)=>{
    console.log(err);
})
app.listen(port, () => {
    console.log(`server listening on ${port}`);
})