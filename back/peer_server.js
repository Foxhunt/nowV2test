const express = require('express')
const app = express()
const ExpressPeerServer = require('peer').ExpressPeerServer

const server = app.listen(3000, () => {
  console.log("listening on port 3000")
})

const options = {
    debug: true
}

const peerserver = ExpressPeerServer(server, options)

app.use('/', peerserver)

peerserver.on("connection", id => {
  console.log(`${id} connected`)
})

peerserver.on("disconnect", id => {
  console.log(`${id} disconnected`)
})
