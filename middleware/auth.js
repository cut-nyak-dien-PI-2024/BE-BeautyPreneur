require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
    validateToken: (req, res, next) => {
     const header = req.headers.authorization;
     if(!header){
        return res.status(401).json({ message: "Masukkan token dlu" });
     }

     const token = header.split(" ")[1];
     if(!token){
        return res.status(401).json({ message: "Token is missing" });
     }

     try{
        const payload = jwt.verify(token, process.env.JWT_KEY);
        req.payload = payload;
        next();
     }catch(err){

       if(err.name === "TokenExpiredError") {
         return res.status(401).json({ message: "login ulang karena token sudah expired", err });
       }

       
        return res.status(401).json({ message: err });
     }
    }, 
    checkRole: (req, res, next) => {
       if(req.payload.role !== "admin"){
        return res.status(403).json({ message: "hanya role admin yang mengakses endpoint ini" });
       }

       next();
    }
}