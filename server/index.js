const dotenv = require('dotenv');
const express = require('express');
const app = express();
dotenv.config();


app.get('/',(req,res)=>{
    res.send("Hello World!");
})


const port = process.env.PORT || 3001

app.listen(port,()=>console.log(`Server is listening to port ${port}`));
