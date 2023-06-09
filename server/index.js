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
const messageRouter = require('./routes/messageRoutes');

// error handlers
const errorHandler = require('./middleware/errorHandler');

// cors origin
const corsOriginsDevelopment = ['http://localhost:3000', 'http://192.168.43.215:3000'];
const corsOriginsProduction = ['https://mern-chat-12tu.onrender.com'];

// middlewares
app.use(cors({ origin: process.env.NODE_ENV === 'production' ? corsOriginsProduction : corsOriginsDevelopment }));
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// user router
app.use('/user/auth/', userRouter);
// chat router
app.use('/api/chat/', chatRouter);
// message router
app.use('/api/message/', messageRouter);


// below code is to serve static build files
// as of now the server acts only as an api and does not serve any static files
// in order to serve static files, place the static files inside a build folder
// and place the build folder in the public folder.
// -----------------------------------------------------------------------------
// app.use('/', express.static(path.join(__dirname, 'public/build')));
// -----------------------------------------------------------------------------

// the below line is to rewrite all routes with index.html in case of single page applications
// -----------------------------------------------------------------------------
// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/build','index.html'));
// })
// -----------------------------------------------------------------------------



// error handler
app.use(errorHandler);

// server start
const port = process.env.PORT || 3001

const startServer = async () => {
    try {
        await connectToMongo();
        server = app.listen(port, ['192.168.43.215', 'localhost'], () => console.log(`Server is listening to port ${port}`));
        const io = require('socket.io')(server, {
            pingTimeout: 60000,
            cors: {
                origin: process.env.NODE_ENV === 'production' ? corsOriginsProduction : corsOriginsDevelopment,
            },
        });
        io.on("connection", (socket) => {
            // console.log("Connected to socket.io");
            socket.on('setup', (userData) => {
                socket.join(userData._id);
                console.log(userData._id);
                socket.emit("connected");
            });
            socket.on("join chat", (roomId) => {
                socket.join(roomId);
                // console.log("User joined roomId: " + roomId);
            });
            socket.on("leave chat", (roomId) => {
                socket.leave(roomId);
                // console.log("User left roomId: " + roomId);
            })
            socket.on("new message", (newMessageReceived) => {
                var chat = newMessageReceived.chat;
                if (!chat.users) return console.log("Chat.users not defined");

                // console.log('message recieved')
                chat.users.forEach(user => {
                    if (user._id === newMessageReceived.sender._id)
                        return;
                    socket.in(user._id).emit('message received', newMessageReceived);
                })
            });
            socket.on("typing", (roomId, userPic) => { socket.in(roomId).emit("typing", roomId, userPic) });
            socket.on("stop typing", (roomId) => { socket.in(roomId).emit("stop typing") });
            socket.off("setup", (userData) => {
                // console.log("User disconnected");
                socket.leave(userData._id);
            })
        });
    } catch (error) {
        console.log("couldn't start server due to db error");
        process.exit(1);
    }
};

startServer();
