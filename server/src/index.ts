import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import cookieParser from 'cookie-parser'
import { registerController } from "./auth/controllers/register.controller.js";

const app = express();

// middleware
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())


// routers
app.use('/auth', registerController)



app.listen(3000, () => {
  console.log("server on port 3000....");
});
