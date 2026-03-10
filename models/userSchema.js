const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String },
    name: { type: String },
    age: { type: Number },
    items: { type: mongoose.Schema.Types.ObjectId, ref: "Item" }, // [ "sds" , "sdsdsd" ]
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" }
})

userSchema.pre("save", async function () {
    //if (this.isModified) return 
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare( password , this.password);
}

module.exports = mongoose.model("User", userSchema)