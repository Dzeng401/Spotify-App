const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

function cookieAuth(req, res, next) {
    if (!req.cookies.access_token) {
        res.status(401).json({error: "User is not logged in"});
    }
    else {
        try {
            const jwtToken = req.cookies.access_token;
            const data = jwt.verify(jwtToken, "secret");
            next();
        }
        catch(error) {
            res.status(401).json({error: "user is not logged in"});
        }
    }
}

module.exports = cookieAuth;