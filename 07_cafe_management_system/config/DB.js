import mongoose from "mongoose";

async function connectDB(){

    try{

        const connect = await mongoose.connect("mongodb://127.0.0.1:27017/Cafemanagement");

        console.log("db connected")
        return connect;

    }catch(err){

        console.log(err.message)
    }
}

export default connectDB;