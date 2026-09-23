import mongoose from "mongoose";

const theatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    screens: {
        type: String,
        enum:["imax","dolby","3d","dolby-atmos"],
        required: true,
    },
    mobileNo: {
        type: Number,
        minlength: 10,
        required: true,

    },

});
const theater = mongoose.model("theaterdata",theatreSchema);

export default theater;
