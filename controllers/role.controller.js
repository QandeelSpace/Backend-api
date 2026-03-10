const Role = require("../models/Role");

const createNewRole = async (req, res) => {
    try {
        const { name, permissions } = req.body

        if (!name || !permissions) {
            return res.status(400).json({
                message : "required data from body"
            })
        }

        const role = await Role.create({
            name,
            permissions
        })

        res.status(201).json({
            message: "New role was created",
            data: role
        })

    } catch (err) {
        res.status(500).json({
            message: "Server Error",
            err: err.message
        })
    }
}

module.exports = {
    createNewRole,
}