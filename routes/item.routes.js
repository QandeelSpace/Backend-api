const express = require("express");
const { createNewItem, getAllItems, getItemBasedId, getItemByName, updateOneItem, updateItemBasedId, hardDeleted, softDelete } = require("../controllers/item.controller");
const authenication = require("../middlewares/authentication");

const itemRouter = express.Router();

itemRouter.post("/create", createNewItem);
itemRouter.get("/all",authenication,getAllItems);
itemRouter.get("/filter-item", getItemByName);
itemRouter.get("/:itemId", getItemBasedId);
itemRouter.put("/update", updateOneItem);
itemRouter.put("/updated-item/:itemId", updateItemBasedId);
itemRouter.delete("/delete" , hardDeleted)
itemRouter.patch("/deleted/:itemId" , softDelete)

module.exports = itemRouter;