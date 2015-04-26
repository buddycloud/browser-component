var express = require('express')
  , app = express()
  , http = require('http').Server(app)

var io = require('socket.io')(http)
  , ltx = require('ltx')
  , Component = require('node-xmpp-component')
  , BusinessLogic = require('./src/index')

app.use(express.static('public'))

var socket = null
var logic = new BusinessLogic()

var component = new Component({
  jid: process.env.JID,
  password: process.env.PASSWORD,
  host: process.env.HOST  || 'localhost',
  port: process.env.PORT || 5347
})

component.on('connect', function() {
  console.log('Component is connected')
})

component.on('error', function(error) {
  console.log('Component error: ' + error)
})
  
component.on('stanza', function(stanza) {
  console.log('Received stanza at component: ' + stanza.toString())
  if (socket) {
    return socket.emit('stanza', stanza.toString())
  }
  logic.process(stanza, function(stanza) {
    if (!stanza) return
    component.send(stanza)
  })
})

io.on('connection', function(newSocket) {
  if (socket) {
    return newSocket.emit('disconnect')
  }
  console.log('We have a new socket, diverting stanzas')
  socket = newSocket
  socket.on('disconnect', function() {
    console.log('Websocket connection closed')
    socket = null
  })
  socket.on('stanza', function(stanza) {
    console.log('Received stanza from websocket: ' + stanza)
    component.send(ltx.parse(stanza))
  })
})

http.listen(3000, function(){
  console.log('listening on *:3000')
})
