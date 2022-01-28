const express = require('express');
const path = require('path')
const http = require('http');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors')
require('path');

const globalErrorController = require('./controller/errorController');
const AppError = require("./utils/appError");
const messageApp = require('./messageApp');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app)
// const io = require('socket.io')(server, {
//     cors: {
//         origin: "http://*:*",
//         method: ['GET', 'POST']
//     }
// })
//Starting Express app


// Configuraton of environment
dotenv.config({ path: "./config.env" });
// DataBase configuration
require('./supports/database').database();
// const db = mongoose.connection;
// db.once('open', () => {
//     const message = db.collection('messages');
//     const changeStream = message.watch();
//     changeStream.on('change', (change) => {
//         console.log(change);
//     })
// })


// const io = socket(server)
// const io = require("socket.io")(server, {
//     cors: {
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST"]
//     }
// })

// io.on("connection", (socket) => {
//     socket.emit("me", socket.id)

//     socket.on("disconnect", () => {
//         socket.broadcast.emit("callEnded")
//     })

//     socket.on("callUser", (data) => {
//         io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
//     })

//     socket.on("answerCall", (data) => {
//         io.to(data.to).emit("callAccepted", data.signal)
//     })
// })



app.use(cors());
//Setting view engine for web
// app.use(express.static(__dirname + "/public"));
app.use(express.static(path.join(__dirname + "/public")));
app.use(bodyParser.urlencoded({ extended: true }));
// app.set('view engine', 'ejs');

// Creating socket io


//message app API module
app.use(messageApp)

app.get("*", (req, res) => {
    res.sendFile(
        path.join(__dirname, "/index.html")
    );
});

//Adding Globule Error handler
app.use(globalErrorController);


//Starting app
let port = 5000
let host = 'localhost'
if (process.env.ENV == 'production') {
    port = process.env.PORT || 8080
    host = process.env.HOST || '0.0.0.0'
}

server.listen(port, host, (err) => {
    if (err) {
        return console.log("Somthing went wrong");
    }
    console.log("Server is started! in %s", process.env.ENV)
    console.log(`link is http://localhost:${port}`);
})
// port = process.env.PORT || 5000
// server.listen(port, "192.168.0.105", (err) => {
//     if (err) {
//         return console.log("Somthing went wrong");
//     }
//     console.log("Server is started! in %s", process.env.ENV)
//     console.log(`link is http://localhost:${port}`);
// })

// mongodb + srv://navi:<password>@cluster0.muobv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority 