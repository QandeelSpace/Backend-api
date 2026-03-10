const express = require("express");
const { createNewRole } = require("../controllers/role.controller");

const roleRouter = express.Router()

roleRouter.post("/create" , createNewRole);

module.exports = roleRouter;