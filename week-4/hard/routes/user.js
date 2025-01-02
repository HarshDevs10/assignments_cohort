const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { mongoose } = require("mongoose");
const bcrypt = require('bcrypt')
const { User } = require('../database/index')
const jwt = require('jsonwebtoken')
require('dotenv').config()

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

router.post('/login', async (req, res) => {
     // Implement user login logic
     const { email, password } = req.body

     let user = null
     try{
        user = User.findOne({
            email
        })
        if (!user){
            return res.json({
                mes: "you have not signed up. first signup"
            })
        }
     }
     catch(err){
        return res.json({
            mes: "an error occured while finding the user",
            err: err
        })
     }


     const passwordCompare = await bcrypt.compare(password, user.password)
     if (passwordCompare){
        let token = null
        try{
            token = jwt.sign({
                id: user._id
            }, process.env.User_Password)
        }
        catch(err){
            return req.json({
                mes: "an error occured while making the token"
            })
        }

        res.json({
            mes: "you have successfully signed in",
            token: token
        })
     }
     else{
        res.json({
            mes: "your password is wrong"
        })
     }

});

router.get('/todos', userMiddleware, async (req, res) => {
    // Implement logic for getting todos for a user
    const userId = req.userId
    
});

router.post('/logout', userMiddleware, (req, res) => {
    // Implement logout logic
});

module.exports = router