const http = require("http")
const express = require("express")
const cors = require("cors")
const socketIO = require("socket.io")

const app = express();
const port = process.env.PORT || 4444;


const users = [{}];



app.use(cors());

app.use(express.json({ limit: '10mb' }));

app.get("/api/data", (req, res) => {
    res.send("Welcome to crazy chat app");
})

const server = http.createServer(app);

const io = socketIO(server);

io.on("connection", (socket) => {
    console.log("New Connection");

    socket.on('joined', ({ user }) => {
        users[socket.id] = user;
        console.log(user, "has joined !");
        socket.broadcast.emit('userJoined', { user: "Admin", message: `${users[socket.id]} has joined` })
        socket.emit('welcome', { user: "Admin", message: `Welcome to the chat, ${users[socket.id]}` })
    })

    socket.on('message', ({ message, id }) => {
        io.emit('sendMessage', { user: users[id], message, id });
    })

    socket.on("uploadDocument", ({ documentData, id }) => {
        console.log(documentData)
        io.emit('sendDocument', { user: users[id], documentData, id });
    });

    socket.on('disconnected', () => {
        socket.broadcast.emit('leave', { user: "Admin", message: `${users[socket.id]} has left` })
        socket.on('leave', (data) => {
            console.log(data.user, data.message)
        })
    })

})
app.use(express.static('build'));
server.listen(port, () => {
    console.log('Server is started on http://localhost:' + port);
})