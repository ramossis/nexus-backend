import prisma from "../config/db.js";
import  bcrypt from "bcrypt";

export const register=async(req,res)=>{
    try {
        const {email,name,password,roleId}=req.body
        const existingUser= await prisma.user.findUnique({where:{email}})
        if(existingUser){
            return res.status(400).json({message:"El Correo ya exsite"})
        }
        const hashPassword= await bcrypt.hash(password,10)
        const user= await prisma.user.create({
            data:{
                email,
                name,
                password:hashPassword,
                roleId:parseInt(roleId)
            }
        })
        res.status(201).json({message:"Usuario registrado con exsito",userId:user.id})
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}