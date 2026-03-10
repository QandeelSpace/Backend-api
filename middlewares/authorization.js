const User = require("../models/userSchema");

const authorize = (permission) => {
    return async (req, res, next) => {
        try {

            //const { role } = req.user;

            console.log("user " , req.user.id);
            

            const user = await User.findById(req.user.id).populate("role")

            if (!user) {
                return res.status(404).json({
                    message : "User not found"
                })
            }

            console.log("role " , user);
            

            const matching = user.role.permissions.includes(permission)

            if (!matching) {
                return res.status(403).json({
                    message : "Not authorized"
                })
            }

            next()


        } catch (err) {
            res.status(500).json({
                message: "Server Error",
                err : err.message
            })
        }

    }
}

module.exports = authorize