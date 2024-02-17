// Load env variable
if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}
const mongoose = require('mongoose');
require('dotenv').config();

async function connectToDb(){
    try{
        await mongoose.connect(process.env.db_URL);
        console.log('db connection successful')
    } catch(err){
        console.log(err);
    }
}

module.exports = connectToDb;