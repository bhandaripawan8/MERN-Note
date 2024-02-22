
const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function requireAuth(req, res, next){
    try{
         // read token off cookies
    const token = req.cookies.Authorization
    // decode the token
    const decode = jwt.verify(token, process.env.SECRET)
    // find user using decoded sub
        const user = await User.findById(decode.sub)
    // attach user to req
        req.user = user;
    // continue on
    console.log('in middleware')
    } catch(error){
        return res.sendStatus(401);
    }
    next();
};

module.exports = requireAuth;