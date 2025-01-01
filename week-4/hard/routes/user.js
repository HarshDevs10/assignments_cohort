const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { mongoose } = require("mongoose");
const bcrypt = require('bcrypt')
const { User } = require('../database/index')

// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const { email,password,firstName,lastName } = req.body

    const hashed = await bcrypt.hash(password,5)
    try{
        const user = await User.create({
            email,
            password: hashed,
            firstName,
            lastName
        })
        console.log(user)
    }
    catch(err){
        return res.json({
            mes: "an error occured while signing up",
            err: err
        })
    }

    res.json({
        mes: "you have successfully signed in"
    })
});

router.post('/login', (req, res) => {
     // Implement user login logic
});

router.get('/todos', userMiddleware, (req, res) => {
    // Implement logic for getting todos for a user
});

router.post('/logout', userMiddleware, (req, res) => {
    // Implement logout logic
});

module.exports = router