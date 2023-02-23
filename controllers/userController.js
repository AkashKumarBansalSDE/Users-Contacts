const asyncHandler = require("express-async-handler"); 
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
//when creating api method ..we will give label
//@des Register a users/register
//@route POST /api/contacts
//@access public 
const registerUser = asyncHandler(async (req,res)=>{
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    //to check existing user is in our db or not
    //usermodel will intereact with our mongodb database
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered !");
    }
    //Hash password
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("Hashed Password:",hashedPassword);
    const user = await User.create({
        username,
        email,
        password:hashedPassword,
    });
    console.log(`User created ${user}`);
    if(user){
        res.status(201).json({_id:user.id, email:user.email});
    }
    else{
        registerUser.status(400);
        throw new Error("user data is not valid");
    }
    res.json({message: "Register the user"});
});

//when creating api method ..we will give label
//@des Login user
//@route POST /api/users/login
//@access public 
const loginUser = asyncHandler(async (req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    //if  hainv proper email and password then need to find that user in db or not
    const user = await User.findOne({email}); 
    //compared password with the hashed password
    if(user && (await bcrypt.compare(password,user.password))){
        //create access token
        const accessToken = jwt.sign({
            //payload which liked to embedded in token
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
            },
        }, 
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"15m"}
        );
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("email or password is not valid");
    }
});

//@des current user info
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req,res)=>{
    res.json(req.user);
});

module.exports = {registerUser,loginUser,currentUser};