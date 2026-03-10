const { default: mongoose } = require("mongoose");

const itemschema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String },
    category: {
        type: String, required: true,
        enum: ["elect", "clothing", "healthy"]
    },
    isDeleted: { type: Boolean, default: false },
    
}
    , {
        timestamps: true
    })

/* server error */
/* itemschema.pre("updateOne", function (next) {
    console.log("test the middelware");
    next()
})

itemschema.post("find" , function () {
    console.log("check this");
    
}) */

itemschema.statics.findByName = function ({itemId}){
   
    return this.findOne({_id :itemId})
}

itemschema.methods.getInfo = function() {
     return this.name;
    };


module.exports = mongoose.model("Item", itemschema);