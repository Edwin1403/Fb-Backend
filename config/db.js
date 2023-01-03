const mongoose = require('mongoose');
require('dotenv').config({});

const url =  process.env.DATABASE_URL;

const connectDB = async () => {
    try {
        await mongoose.set("strictQuery", false);
        const connect = await mongoose.connect(url);
        console.log(`MongoDB Connected successfully on: ${connect.connection.host}`)
    } catch (error) {
        console.log(error);
    }
}
module.exports = connectDB;