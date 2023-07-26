const express = require('express');
const router = express.Router();
require('dotenv').config();
const User = require('../schemas/userModel.js');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const cookieAuth = require("../middleware/cookie-auth.js");

router.post("/signup", async (req, res, next) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 1);
    const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
        refreshToken: req.body.refreshToken,
        spotifyUser: req.body.spotifyUser,
        spotifyEmail: req.body.spotifyEmail
    });
    User.findOne({username: req.body.username})
    .then(user => {
        if (user !== null) {
            throw new Error("A user with this email was already found");
        }
        newUser.save()
        .then(user => {
            const access_token = jwt.sign({currentUser: user}, "secret", {expiresIn: '1h'});
            res.cookie("access_token", access_token, {
                maxAge: 1000 * 60 * 60,
                httpOnly: true,
            }).status(200).json({accessToken: access_token, newUser: user});
        })
        .catch(err => {
            res.status(401).json({error: err});
        })
    })
    .catch(err => {
        res.status(401).json({error: err})
    })
});

router.post("/login", async(req, res, next) => {
    if(req.body.username === "") {
        res.status(401).json({error: "No user found"});
    }
    else {
        User.findOne({username: req.body.username}).then(user => {
            if (user === null) {
                res.status(401).json({error: "No user found"});
            }
            bcrypt.compare(req.body.password, user.password, function(error, result) {
                if (result === true) {
                    const access_token = jwt.sign({currentUser: user}, "secret", {expiresIn: '1h'});
                    res.cookie("access_token", access_token, {
                        maxAge: 1000 * 60 * 60,
                        httpOnly: true,
                    }).status(200).json({accessToken: access_token, newUser: user});
                }
                else {
                    res.status(401).json({error: "No user found"});
                }
            });
        }).catch(error => {
            res.status(401).json({error: error});
        });
    }
});

router.get("/authenticate", cookieAuth, (req, res, next) => {
    res.status(200).json({message: "User is logged in"});
});

router.get("/logout", (req, res, next) => {
    res.status(200).clearCookie("access_token", {httpOnly: true, domain: "localhost", path: "/", secure: true}).json({message: "Cookie for refresh deleted"});
});

module.exports = router;