const userModel = require("../models/userSchema")
const Item = require("../models/itemSchema");
const bcrypt = require("bcrypt");
const salt = 10;
const jwt = require("jsonwebtoken");
const Role = require("../models/Role")

const users = [
    { name: "John", age: 25 },
    { name: "Jane", age: 20 },
    { name: "Mark", age: 19 },
];


const getAllUsers = (req, res) => {
   //console.log(req.user.id);
    
    userModel.find({}).populate("items").then((result) => {
        res.status(200)
        res.json(result)
    }).catch((err) => {
        res.send(err)
    })
}

// .findOne 
const getFilter = (req, res) => {
    const { name } = req.query

    console.log("name", name);

    userModel.findById("699e01ee201291f7e89ddb3a").then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json({
            message: "Failed"
        })
    })
}

const getUserbasedname = () => {

}

const getDataUser = (req, res) => {
    const { name } = req.params;

    const user = users.find((Element) => {
        return Element.name == name
    });

    res.status(200)
    res.json({
        user
    })
}

const createNewUser = (req, res) => {
    const { email, name, password, age } = req.body;

    if (!email) {
        res.status(404).json({
            message: "Email Not Found"
        })
    }

    const user = new userModel({
        email,
        password,
        name,
        age
    })

    user.save().then(() => {
        res.status(201).json({
            message: " New user was created"
        })
    }).catch((err) => {
        res.status(500).json({
            message: "Failed"
        })
    })
}

const addNewItemToUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const { name, category, image } = req.body

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required"
            })
        }

        if (!name || !category) {
            return res.status(400).json({
                message: " Name and Category is required"
            })
        }

        const newItem = await Item.create({
            name,
            category,
            image
        })

        const user = await userModel.findByIdAndUpdate(
            userId,
            { $push: { items: newItem._id } }
        )

        console.log("data", user);


        /*  const user = await userModel.findById(userId);
    
         if (!user) {
             return res.status(404).json({
                 message: "User not found"
             })
         } */

        /* 
        user object data
        */

        /*         user.items.push(newItem._id)
        
                await user.save() */

        res.status(200).json({
            message: "New item was added",
            data: user
        })

    } catch (err) {
        res.status(500).json({
            message: "Server Error"
        })
    }
}

const generateToken = (user) => {
    const payload = {
        id: user._id,
        role: user.role
    }

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h"
    })
}

const register = async (req, res) => {
    try {
        const { name, email, password, age, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "There is missing data in body"
            })
        }

        if (!role) {
            return res.status(400).json({
                message: "Role is required"
            })
        }

        const existUser = await userModel.findOne({ email })

        if (existUser) {
            return res.status(409).json({
                message: "User was already registed"
            })
        }

        const roleDetails = await Role.findOne({ name: role })

        if (!roleDetails) {
            return res.status(404).json({
                message: "Role not Found "
            })
        }

        const user = await userModel.create({
            name,
            email,
            password,
            age,
            role: roleDetails._id
        })

        if (!user) {
            return res.status(404).json({
                message: "user was not created/ not found"
            })
        }

        console.log("user", user);


        const token = generateToken(user)

        res.status(200).json({
            message: "New User was registred",
            data: user,
            token: token
        })

    } catch (err) {
        res.status(500).json({
            message: "Server Error",
            err: err.message
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password is required"
            })
        }

        const user = await userModel.findOne({ email })
        console.log("user", user);


        if (!user) {
            return res.status(404).json({
                message: "User was not found"
            })
        }

        const isMatch = await user.comparePassword(password)

        if (!isMatch) {
            return res.json(404).json({
                message: "password not correct"
            })
        }

        const token = generateToken(user)

        res.status(200).json({
            message: "Was login sucessfully",
            data: user,
            token
        })

    } catch (err) {
        res.status(500).json({
            message: "Server Error",
            err: err.message
        })
    }
}

module.exports = {
    getAllUsers,
    getFilter,
    getDataUser,
    createNewUser,
    addNewItemToUser,
    register,
    login
}