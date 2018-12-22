const server = require("http").createServer()
const io = require("socket.io")(server, {serveClient: false})

const REDIS_HOST = "nowv2testredis.now.sh"

const redis = require('redis')
const redisAdapter = require('socket.io-redis')
const pub = redis.createClient(REDIS_HOST, { auth_pass: "StrongPassword!!!" })
const sub = redis.createClient(REDIS_HOST, { auth_pass: "StrongPassword!!!" })
io.adapter(redisAdapter({ pubClient: pub, subClient: sub }))

io.on("connect", socket => {
    socket.on("message", random => {
        socket.broadcast.emit("random", random)
    })
})

server.listen()
