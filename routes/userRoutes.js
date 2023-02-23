const express = require("express");
const { registerUser,loginUser, currentUser} = require("../controllers/userController");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");

router.post("/register",registerUser);

//endpoint for login
router.post("/login",loginUser);

//endpoint for current user
router.get("/current",validateToken,currentUser); 

module.exports = router;
