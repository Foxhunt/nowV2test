const server = require("http").createServer()
const io = require("socket.io")(server, {serveClient: false})

const random = Math.random()
const NOW_URL = process.env.NOW_URL

io.on("connect", socket => {
    socket.on("message", fn => {
        fn({random, NOW_URL})
    })
})

server.listen()
