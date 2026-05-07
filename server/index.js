import express from 'express'
import cors from 'cors'
import {createServer} from 'http'
import { Server } from 'socket.io'


const app = express()
const server = createServer(app)
const io = new Server(server, {         // i have to write - cors - again, because app.use(cors()) = only cover http request
    cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
})

// cors
var corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200 
}
app.use(cors(corsOptions))


// middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))




// router
app.get('/', (req, res) => {
    res.send('this is home page')
})


// socket/io
io.on('connection', (socket) => {
    console.log(`socket is connected ${socket.id}`)
    console.log('socket io connected')

    socket.emit('welcome', `welcome riad !!! ${socket.id}`)

    socket.broadcast.emit('rbroadcast', `welcome riad in Broadcast ${socket.id}`)

    socket.on('emit-riad', (data) => {
        console.log(data)
    })
})



server.listen(3000, () => {
    console.log('server on port 3000....')
})