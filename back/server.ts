import http from "http"
import socketIo from "socket.io"

const server = http.createServer()
const io = socketIo(server, {serveClient: false})

const random = Math.random()
const NOW_URL = process.env.NOW_URL

io.on("connect", socket => {
    const intervall = setInterval(() => {
        socket.send({random, NOW_URL})
    }, 1000)

    socket.on("disconnect", () => {
        clearInterval(intervall)
    })
})

server.listen()
