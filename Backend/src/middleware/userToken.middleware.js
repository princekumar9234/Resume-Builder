import jwt, { decode } from "jsonwebtoken";
import config  from "../config/config.js";

export async function userAuth (req,res,next) {
   const refreshToken = req.cookies.refreshToken;

   if(!refreshToken) {
    return res.status(401).json({message :"refreshToken not provided"})
   }

 try {
    const decoded =  jwt.verify(refreshToken, config.JWT_SECRECT);

    req.user = decoded,
    next()
 }
 catch(err) {
    return res.status(401).json({message :"Unauthorized Access"});
    console.log(err);
 }
}