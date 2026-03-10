const { default: axios } = require("axios");
const express = require("express");
require("dotenv").config();
const PORT = 3000;
require("./models/db");
const cors = require("cors");

const app = express();

console.log(process.env.test);

app.use(cors({
    origin : "http://localhost:5173"
})) // acccess 

console.log("this is for testing");

app.use(express.json())
app.use(express.static("public"));

const fs = require("fs");
const usersRouter = require("./routes/user.routes");
const itemRouter = require("./routes/item.routes");
const roleRouter = require("./routes/role.routes");

// a middleware that enables us to read the received JSON data
app.use(express.json());



app.use("/users", usersRouter);
app.use("/items", itemRouter);
app.use("/roles", roleRouter);

/* app.get("/users/filter", )

app.get("/users/:name", )
 */

// start
// next
// end

const fetchData = () => {
    axios.get("https://jsonplaceholder.typicode.com/posts/1").then((response) => {
        console.log("posts data fetching", response.data);

    }).catch((error) => console.log(error)
    )
}

//fetchData()

const dataPosts = async () => {
    try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1")
        console.log("data related to posts", response.data);

    } catch (error) {

    }
}





const step1 = (req, res, next) => {
    if (req.params.name == "Mark") {
        next()
    }
    res.status(404).json({
        message: "User not Found"
    })
}

app.get("/items/:name", step1, (req, res) => {
    const { name } = req.params

    res.status(200).json({
        message: "OK"
    })
})

app.use((req, res, next) => {
    res.send("Ok")
})






app.listen(PORT, () => {
    console.log(`you are lisning on this port ${PORT}`);

})