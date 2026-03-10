const { default: mongoose } = require("mongoose");

mongoose.connect(process.env.URL_DB).then(() => {
    console.log("Ready To Use your DB");

}).catch((err) => {
    console.log(err);

})