import httpError from "../middleware/httpError.js";
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

const getAllTheater = async (req,res,next)=>{
    try {
        const Theaters = await theatre.find({});

        if(Theaters.length ===0) {
            return next(new httpError("No Theater Data Found",404));
        }

        res.status(200).json({
            success:true,
            message:"theater data fetched successfully",
            total: Theaters.length,
            Theaters,
        });
        
    } catch (error) {
        return next(new httpError(error.message,500));
        
    }
};

const getTheaterById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const Theater = await Theater.findById(id);

    if (!theatre) {
      return next(new httpError("theater not found with this id", 404));
    }

    return res
      .status(200)
      .json({ success: true, message: "theater found", theatre });
  } catch (error) {
    return next(new httpError(error.message, 500));
  }
};


const deleteTheaterById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const theater = await theatre.findByIdAndDelete(id);

    

    if (!theater) {
      return next(new httpError("theater not found with this id", 404));
    }

    res
      .status(200)
      .json({ success: true, message: "theater deleted successfully" });
  } catch (error) {
    return next(new httpError(error.message, 500));
  }
};

export default {add,getAllTheater,getTheaterById,deleteTheaterById};