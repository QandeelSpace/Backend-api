const jwt = require("jsonwebtoken");

const authenication = (req, res, next) => {

    console.log("req.headers", req.headers);

    const authDetails = req.headers.authorization;

    console.log("authDetails", authDetails.split(" ")[1]);

    const token = authDetails.split(" ")[1];

    console.log("token", token);

    if (!token) {
        return res.status(401).json({
            message: "token was not provided"
        })
    }

    try {

        const details = jwt.verify(token, process.env.JWT_SECRET);

        console.log("payload", details);

        req.user = details  // payload
        next()
    } catch (err) {
        res.status(403).json({
            message: "Token was not valid"
        })
    }
}

module.exports = authenication;

/* 
req obj body params query headers authorization  
*/


/* 
req.payload
*/