const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function signUp(req, res) {
    try {
        // Get user email and password from the body
        const { email, password } = req.body;

        // Hash password
        const hashedPassword = bcrypt.hashSync(password, 8);

        // Create a user with the data
        await User.create({ email, password: hashedPassword });

        // Respond with success message
        res.status(200).send('Signup successful');
    } catch (error) {
        console.error(error);
        res.status(400).send('Signup failed');
    }
}

async function login(req, res) {
    const { email, password } = req.body;

    try {
        // Find the user by email in the database
        const user = await User.findOne({ email });

        // Check if the user exists and if the password matches
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Calculate expiration time (30 days from now)
        const exp = new Date();
        exp.setDate(exp.getDate() + 30);

        // Create JWT token
        const token = jwt.sign({ userId: user._id }, process.env.SECRET, { expiresIn: '30d' });

        // Set the cookie
        res.cookie("Authorization", token, {
            expires: exp,
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production'
        });

        // Return success response
        res.sendStatus(200);
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


function logOut(req, res) {
    // Implement logout functionality if needed
}

function checkAuth(req, res){
    console.log(req.user);
    res.sendStatus(200);
}

module.exports = {
    signUp,
    login,
    logOut,
    checkAuth
};
