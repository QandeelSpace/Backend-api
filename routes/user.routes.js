const express = require("express");
const { getAllUsers, getFilter, getDataUser, createNewUser, addNewItemToUser, register, login } = require("../controllers/user.controllers");
const authenication = require("../middlewares/authentication");
const authorize = require("../middlewares/authorization");

const usersRouter = express.Router();

usersRouter.get("/all", authenication, authorize("read-advanced") , getAllUsers); // users/ + get
usersRouter.get("/filter", getFilter);
usersRouter.get("/:name", getDataUser);

usersRouter.post("/create", createNewUser);
usersRouter.post("/new-item/:userId", addNewItemToUser)

usersRouter.post("/register",authenication, register);
usersRouter.post("/login", login)

module.exports = usersRouter;