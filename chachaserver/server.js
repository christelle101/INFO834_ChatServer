require("dotenv").config();

const mongoose = require("mongoose");
const { Server } = require("socket.io");

mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

mongoose.connection.on('error', (err) => {
    console.log("Mongoosse connection ERROR: " + err.message);
});

mongoose.connection.once('open', () =>{
    console.log("MongoDB Connected...");
});

//Retrieve the models
require('./models/User');
require('./models/Chatroom');
require('./models/Message');

const app = require('./app');

const server = app.listen(3000,() => {
    console.log("Server listening on port 3000...")
})

const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    allowEIO3: true,
    cors: {
      origin: true,
      methods: ['GET', 'POST'],
      credentials: true
    }  
});
const jwt = require("jwt-then");

const Message = mongoose.model("Message");
const User = mongoose.model("User");

io.use(async (socket, next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const payload = await jwt.verify(token, process.env.SECRET);
        socket.userId = payload.id; 
        next();
    } catch(err){}
});

io.on("connection", (socket) =>{
    console.log("Connected: " + socket.userId);
    socket.on("disconnect", () => {
        console.log("Disconnected: " + socket.userId);
    });

    socket.on("joinRoom",({ chatroomId }) => {
        socket.join(chatroomId);
        console.log("Un utilisateur vient de rejoindre la chatroom: " + chatroomId);
    });

    socket.on("leaveRoom", ({ chatroomId }) => {
        socket.leave(chatroomId);
        console.log("Un utilisateur vient de quitter la chatroom: " + chatroomId);
    });

    socket.on("chatroomMessage", async ({ chatroomId, message }) => {
        if(message.trim().length > 0){
            const user = await User.findOne({_id: socket.userId});
            const newMessage = new Message({
                chatroom: chatroomId,
                user: socket.userId,
                message,
            });
            io.to(chatroomId).emit("newMessage", {
                message,
                username: user.username,
                userId: socket.userId,
            });
            await newMessage.save();
        }
    });
});