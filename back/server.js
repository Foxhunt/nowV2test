const server = require("http").createServer(
    (req, res) => {
        res.end("Hello from a vanilla server!")
    }
  )
const io = require("socket.io")(server, {serveClient: false})

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
