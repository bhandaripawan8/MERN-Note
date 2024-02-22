const User = require('../models/User')
const bcyrpt = require('bcryptjs');

async function signUp(req, res){
    try{
        // get user email and password from the body
    const {email, password} = req.body
    // hash password
    const hashedPassword = bcyrpt.hashSync(password, 8)
    // create a user with the data
    await User.create({email, password: hashedPassword});

    // respond
    res.sendStatus(200,'signup successful');
    } catch(error){
        console.log(error);
        res.sendStatus(400)
    }

}

function login(req, res){

}

function logOut(req, res){

};

module.exports = {
    signUp,
    login,
    logOut
}