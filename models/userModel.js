const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
    type: String,
    required:[true,"please add user name"],
    },
    email:{
        type:String,
        required:[true,"please add the user email id"],
        unique:[true,"Email address already taken"],
    },
    password:{
        type:String,
        required:[true,"please add the user password"],
    },
 },
    {TimestampS: true,
}
);

module.exports = mongoose.model("User",userSchema);