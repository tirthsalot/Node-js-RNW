import httperror from "../middleware/httpError.js";

import theatre from "../model/theater.model.js";

const add = async (req,res,next)=> {
    try {
        const { name, email, screens, mobileNo} = req.body;

        const newTheater = await new theatre({
            name,
            email,
            screens,
            mobileNo,
        });
        await newTheater.save();

        res.status(201).json({
            success:true,
            message:"Theater added successfully",
            newTheater,
        });
        
    } catch (error) {
        return next(new httperror(error.message,500))
        
    }
};
export default add;