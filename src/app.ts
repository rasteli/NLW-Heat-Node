import "dotenv/config"

import http from "http"
import cors from "cors"
import express from "express"
import { Server } from "socket.io"

import routes from "./routes"

const app = express()
app.use(cors())

const httpServer = http.createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
})

io.on("connection", socket => {
  console.log(`User connected on socket ${socket.id}`)
})

app.use(express.json())
app.use(routes)

export { io, httpServer }
