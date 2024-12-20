const mongoose = require('mongoose');
const dotenv= require('dotenv').config()
const connectDB= async()=>{
    try {
        const conn = await mongoose.connect(process.env.DB_CONNECT);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports=connectDB