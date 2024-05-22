const app = require('express')()
const http = require('http')
const { Server } = require('socket.io')
const cors = require("cors")
const { ExpressPeerServer } = require('peer');
const httpServer = http.createServer(); 
const peerServer = ExpressPeerServer(httpServer, {
  debug: true,
});

app.use(cors())
app.use("/peerjs", peerServer);


const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

app.get('/', function (req, res) {
  res.send('Hello from the server!')
})

const socketID_to_Users_Map = {}
const roomID_to_Code_Map = {}

async function getUsersinRoom(roomId, io) {
  const socketList = await io.in(roomId).allSockets()
  const userslist = []
  socketList.forEach((each => {
    (each in socketID_to_Users_Map) && userslist.push(socketID_to_Users_Map[each].username)
  }))

  return userslist
}

async function updateUserslistAndCodeMap(io, socket, roomId) {
  socket.in(roomId).emit("member left", { username: socketID_to_Users_Map[socket.id].username })

  // update the user list
  delete socketID_to_Users_Map[socket.id]
  const userslist = await getUsersinRoom(roomId, io)
  socket.in(roomId).emit("updating client list", { userslist: userslist })

  userslist.length === 0 && delete roomID_to_Code_Map[roomId]
}


//Whenever someone connects this gets executed
io.on('connection', function (socket) {
  console.log('A user connected', socket.id)

  socket.on("when a user joins", async ({ roomId, username }) => {
    console.log("username: ", username)
    socketID_to_Users_Map[socket.id] = { username }
    socket.join(roomId)

    const userslist = await getUsersinRoom(roomId, io)

    // for other users, updating the client list
    socket.in(roomId).emit("updating client list", { userslist: userslist })

    // for this user, updating the client list
    io.to(socket.id).emit("updating client list", { userslist: userslist })

    // send the latest code changes to this user when joined to existing room
    if (roomId in roomID_to_Code_Map) {
      io.to(socket.id).emit("on language change", { languageUsed: roomID_to_Code_Map[roomId].languageUsed })
      io.to(socket.id).emit("on code change", { code: roomID_to_Code_Map[roomId].code })
    }

    // alerting other users in room that new user joined
    socket.in(roomId).emit("new member joined", {
      username
    })
  })

  // for other users in room to view the changes
  socket.on("update language", ({ roomId, languageUsed }) => {
    if (roomId in roomID_to_Code_Map) {
      roomID_to_Code_Map[roomId]['languageUsed'] = languageUsed
    } else {
      roomID_to_Code_Map[roomId] = { languageUsed }
    }
  })

  // for user editing the code to reflect on his/her screen
  socket.on("syncing the language", ({ roomId }) => {
    if (roomId in roomID_to_Code_Map) {
      socket.in(roomId).emit("on language change", { languageUsed: roomID_to_Code_Map[roomId].languageUsed })
    }
  })

  // for other users in room to view the changes
  socket.on("update code", ({ roomId, code }) => {
    if (roomId in roomID_to_Code_Map) {
      roomID_to_Code_Map[roomId]['code'] = code
    } else {
      roomID_to_Code_Map[roomId] = { code }
    }
  })

  // for user editing the code to reflect on his/her screen
  socket.on("syncing the code", ({ roomId }) => {
    if (roomId in roomID_to_Code_Map) {
      socket.in(roomId).emit("on code change", { code: roomID_to_Code_Map[roomId].code })
    }
  })

  socket.on("leave room", ({ roomId }) => {
    socket.leave(roomId)
    updateUserslistAndCodeMap(io, socket, roomId)
  })

  socket.on("disconnecting", (reason) => {
    socket.rooms.forEach(eachRoom => {
      if (eachRoom in roomID_to_Code_Map) {
        updateUserslistAndCodeMap(io, socket, eachRoom)
      }
    })
  })
  
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected-call', userId)

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected-call', userId)
    })
  })

  //Whenever someone disconnects this piece of code executed
  // socket.on('disconnect', function () {
  //   console.log('A user disconnected')
  // })
})


const PORT = process.env.PORT || 5200

server.listen(PORT, function () {
  console.log(`listening on port : ${PORT}`)
})