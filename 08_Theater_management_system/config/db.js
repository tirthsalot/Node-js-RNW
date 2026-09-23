import mongoose, { connect } from "mongoose";

async function Connectdb() {
    try{
        const connect = await mongoose.connect(process.env.THEATER_URI);

        console.log("env path",process.env.THEATER_URI)

        console.log("db connected");

        return connect;
    }catch (error) {
        console.log(error.message)
    }
    
}
export default Connectdb;