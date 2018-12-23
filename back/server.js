const server = require("http").createServer()
const io = require("socket.io")(server, {serveClient: false})

const REDIS_HOST = process.env.REDIS_HOST
const REDIS_PORT = process.env.REDIS_PORT
const REDIS_PASS = process.env.REDIS_PASS

const redis = require('redis')
const redisAdapter = require('socket.io-redis')
const pub = redis.createClient(REDIS_PORT, REDIS_HOST, { auth_pass: REDIS_PASS })
const sub = redis.createClient(REDIS_PORT, REDIS_HOST, { auth_pass: REDIS_PASS })
io.adapter(redisAdapter({ pubClient: pub, subClient: sub }))

io.on("connect", socket => {
    socket.on("message", random => {
        socket.broadcast.emit("random", random)
    })
})

server.listen()
