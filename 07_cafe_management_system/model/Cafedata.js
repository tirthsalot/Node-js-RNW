import mongoose from "mongoose";

const CafeSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    ID:{
        type:Number,
        required:true,
        unique:true,
    },
    menu:{
        type:String,
        enum:["shakes","coffee","beverages","snakes","pizza"],
        default:"Shakes"
    }
})

const Cafe = mongoose.model("cafe data",CafeSchema);

export default Cafe;