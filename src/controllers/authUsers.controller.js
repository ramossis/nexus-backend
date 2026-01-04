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
        // console.log(error)
        res.status(500).json({error: error.message})
    }
}
export const login=async(req,res)=>{
    try {
        const{email,password}=req.body
        const user= await prisma.user.findUnique({where:{email}})
        if(!user){
            return res.status(400).json({message:"Credenciales Invalidas"})
        }
        const isMatch= await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"Crendenciales Invalidas"})
        }
        res.status(200).json({message:"Bienvenido",user:{name:user.name}})
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}