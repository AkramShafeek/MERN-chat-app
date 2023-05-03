const dotenv = require('dotenv');
const express = require('express');
const app = express();
const connectToMongo = require('./database/connectToMongo');
const Test = require('./models/TestModel');

dotenv.config();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World!");
})
app.post('/testDb',(req,res)=>{
    console.log(req.body);
    Test.create(req.body);
    res.send('ok');
})


const port = process.env.PORT || 3001

const startServer = async () => { 
    try {
        await connectToMongo();
        app.listen(port, () => console.log(`Server is listening to port ${port}`));
    } catch (error) {
        console.log("couldn't start server due to db error");
        process.exit(1);
    } 
};

startServer();
