import 'dotenv/config'
import jwt from "jsonwebtoken";
export const generateToken=(id,roleId)=>{
   return jwt.sign({id,roleId},process.env.JWT_SECRET,{expiresIn:'2h'})
}