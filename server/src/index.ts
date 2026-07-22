import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser'
import { authRouter } from "./auth/routers/auth.router";

const app = express();

// middleware
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())


// routers
app.use('/auth', authRouter)



app.listen(3000, () => {
  console.log("server on port 3000....");
});
