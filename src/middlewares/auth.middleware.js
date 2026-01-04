import 'dotenv/config.js'
import jwt from "jsonwebtoken";

export const verifyToken=(req,res,next)=>{
    const authHeader= req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(!token){
       return res.status(403).json({message: "No se proporciono un token de Accesso"})
    }
 try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    req.user=decoded
    next()
 } catch (error) {
    return res.status(401).json({message:"Token invalido o expirado" })
}
}