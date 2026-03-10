const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 
require("dotenv").config()

const hashing = async (password) =>{
    const salt = 10 // 1-10
    return await bcrypt.hash(password , salt)
}

const run = async ()=>{
    const password = await hashing("admin123")
    console.log("password" , password);
    const isMatch = await bcrypt.compare("ad3" , password)
    console.log("isMatch" , isMatch );
    

}

const generateToken = ()=>{
    const payload = {
        id : "121212",
        role : "user"
    }

    return jwt.sign(payload , process.env.JWT_SECRET , {
        expiresIn : "1h"
    })
}

const verfiy = ()=>{
    return jwt.verify(generateToken(), process.env.JWT_SECRET)
}

console.log("token" , generateToken());
console.log("check :" , verfiy());

const exp = 1772569512;

console.log(new Date(exp * 1000).toUTCString());

