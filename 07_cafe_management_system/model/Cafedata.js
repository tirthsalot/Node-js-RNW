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
    },
    isOpen:{
        type:String,
        enum:["open","close"],
        default:"open"
    },
    mobileNumber:{
        type:String,
        required:true,
        minlength:10,
    }

})

const Cafe = mongoose.model("cafe data",CafeSchema);

export default Cafe;