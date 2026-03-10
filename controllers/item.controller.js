const Item = require("../models/itemSchema");

const createNewItem = async (req, res) => {
    try {
        const { name, category, image } = req.body;
        /* validation */
        if (!name || !category) {
            return res.status(400).json({
                message: "Name and Category is required"
            })
        }

        const existItem = await Item.findOne({ name })

        if (existItem) {
            return res.status(409).json({
                message: "This item with name was already existed"
            })
        }

        const newItem = await Item.create({
            name,
            category,
            image
        })

        res.status(201).json({
            message: "New Item was created Successfully",
            data: newItem,
        })

    } catch (err) {
        res.status(500).json({
            message: "Server Error"
        })
    }
}

const getAllItems = async (req, res) => {
    try {
        const items = await Item.find({isDeleted : false})

        res.status(200).json({
            message: "All items was fetching",
            data: items
        })

    } catch (err) {
        res.status(500).json({
            message: "Server Error"
        })
    }
}

const getItemBasedId = async (req, res) => {
    try {
        const { itemId } = req.params;

        if (!itemId) {
            return res.status(400).json({
                message: "Item ID is required"
            })
        }

        const item = await Item.findById(itemId)
        
        // await Item.findOne({itemId})

        if (!item) {
            return res.status(404).json({
                message: "Item not found"
            })
        }

        res.status(200).json({
            message: "Fetching item DONE",
            data: item
        })

    } catch (err) {
        res.status(500).json({
            message: "Server Error"
        })
    }
}

const getItemByName = async (req, res) => {
    try {

        const { name } = req.query;

        console.log("name check query", name);


        if (!name) {
            return res.status(400).json({
                message: "name is required"
            })
        }

        const item = await Item.findOne({ name })

        if (!item) {
            return res.status(404).json({
                message: "item was not Found"
            })
        }

        res.status(200).json({
            message: "Fetching Item was done",
            data: item
        })

    } catch (err) {
        res.status(500).json({
            message: "Server Error"
        })
    }
}

const updateOneItem = async (req, res) => {
    try {
        const { name, category, image } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Name is required"
            })
        }

        /*         const updatedItem = await Item.findOneAndUpdate(
                    { name },
                    { category, image },
                    { new: true } // retuned the updated item
                )
         */

        const updatedItem = await Item.updateOne(
            { name },
            { category, image }
        )

        res.status(200).json({
            message: "Item was updated successfully",
            data: updatedItem
        })

    } catch (err) {
        res.status(500).json({
            message: "Server Error"
        })
    }
};

const updateItemBasedId = async (req, res) => {
    try {
        const { itemId } = req.params;

        const { category, name, image } = req.body;

        if (!itemId) {
            return res.status(400).json({
                message: "Item Id was not provided"
            })
        }

        if (!category || !name || !image) {
            return res.status(400).json({
                message: "Category , image and name are required"
            })
        }

        const existItem = await Item.findOne({ name })

        if (!existItem) {
            return res.status(409).json({
                message: "name is already registed"
            })
        }

        const updatedItem = await Item.findByIdAndUpdate(
            itemId,
            { category, image, name }
        )

        if (!updatedItem) {
            return res.status(404).json({
                message: "Item not Found"
            })
        }

        res.status(200).json({
            message: "Item was updated",
            data: updatedItem
        })

    } catch (err) {
        res.status(500).json({
            message: "Server Error"
        })
    }
}

const hardDeleted = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({
                message: "name is required"
            })
        }

        await Item.deleteOne({ name })

        res.status(200).json({
            message: "Item was deleted successfully"
        })
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
}

const softDelete = async (req, res) => {
    try {
        const { itemId } = req.params;

        console.log("check testing");


        if (!itemId) {
            return res.status(400).json({
                message: "Item ID is required"
            })
        }

        const item = await Item.findByName({itemId});

        console.log("item",item.getInfo());
         
        
        await Item.updateOne(
            { _id: itemId }, // {itemId : itemId}
            { isDeleted: true }
        )

        res.status(200).json({
            message: "Item was deleted succesuflly"
        })
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
}

module.exports = {
    createNewItem,
    getAllItems,
    getItemBasedId,
    getItemByName,
    updateOneItem,
    updateItemBasedId,
    hardDeleted,
    softDelete
}