const mongoose = require("mongoose");

//schema have all values that we want in our contact resource
const contactSchema =mongoose.Schema({
    //add property user_id..id for user who is creating the contact..this is created in mongodb..
    //whenever creating contact there should be userid,ref: it is reference of the model that is User
    user_id:{
        name:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
      },
        type:String,
        required: [true, "Please add the contact name"],
    },
    email:{
        type:String,
        required: [true, "Please add the contact email address"],
          
    },
    phone:{
        type:String,
        required: [true, "Please add the contact phone number"],
          
    },
},
{
    timestamps:true,
}
);
//provide name of model "Contact"
module.exports = mongoose.model("Contact",contactSchema);
