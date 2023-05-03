// config
require('express-async-errors');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');

// express
const express = require('express');
const app = express();

// database
const connectToMongo = require('./database/connectToMongo');

// routes
const userRouter = require('./routes/userRoutes');

// error handlers
const errorHandler = require('./middleware/errorHandler');

// middleware to parse json data
app.use(express.json());
//middleware to server static files
app.use('/assets',express.static(path.join(__dirname,'public/assets')));

// user router
app.use('/user/auth/',userRouter);

// error handler
app.use(errorHandler);


// server start
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
