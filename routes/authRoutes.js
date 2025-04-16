const express = require("express");
const router = express.Router();

const  {signup, login} = require("../controllers/authController")

// routes POST / signup /login 
// Register a new users
router.post('/signup', signup)
router.post('/login', login)

module.exports = router