import 'dotenv/config'
import express from 'express'
import cors from "cors";
import prisma from './src/config/db.js';
import authuser from "./src/routes/authuser.routes.js";
const app=express()

app.use(express.json())
app.use(cors())

app.use('/api/auth',authuser)

app.listen(process.env.PORT,()=>{
    console.log(`Servidor Encendido en puerto ${process.env.PORT}`)
})
export default app