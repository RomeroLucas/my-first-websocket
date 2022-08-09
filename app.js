const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
// websocket imports
const { Server } = require('socket.io')
const io = new Server(server)

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + "/public/index.html")
})

// Socket connection server side
io.on('connection', (socket) => {

    // socket disconnect
    socket.on('disconnect', () => {
        console.log('user disconected')
    })

    // socket "routes"
    socket.on('send message', (msg) => {
        io.emit('get message', `${socket.data.user}: ${msg}`);
    });
    
    socket.on('momento', () => {
        io.emit('teste', 'escrevendo no console')
    })

    socket.on('entrou', (username) => {
        socket.data.user = username
        socket.broadcast.emit('hi', `${socket.data.user} entrou na sala`)
    })
    
})



let port = 4000
server.listen(port, () => {
    console.log(`Listening on: http://localhost:${port}`)
})