// config
require('express-async-errors');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const cors = require('cors');

// express
const express = require('express');
const app = express();

// database
const connectToMongo = require('./database/connectToMongo');

// routes
const userRouter = require('./routes/userRoutes');
const chatRouter = require('./routes/chatRoutes');

// error handlers
const errorHandler = require('./middleware/errorHandler');

// middlewares
app.use(cors({ origin: ['http://localhost:3000', 'http://192.168.43.215:3000'] }));
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// user router
app.use('/user/auth/', userRouter);
// chat router
app.use('/chat/', chatRouter);

// error handler
app.use(errorHandler);

// server start
const port = process.env.PORT || 3001

const startServer = async () => {
    try {
        await connectToMongo();
        app.listen(port, ['192.168.43.215', 'localhost'], () => console.log(`Server is listening to port ${port}`));
    } catch (error) {
        console.log("couldn't start server due to db error");
        process.exit(1);
    }
};

startServer();
