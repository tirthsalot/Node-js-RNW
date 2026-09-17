import HttpError from "../middleware/httperror.js";
import Cafe from "../model/Cafedata.js";

const add = async (req, res, next) => {

    try {

        const { name, email, ID, menu } = req.body;

        const newCafe = new Cafe({
            name,
            email,
            ID,
            menu,
            isOpen,
            mobileNumber
        });

        await newCafe.save();

        res.status(201).json({
            success: true,
            message: "Cafe data added successfully",
            newCafe,
        });

    } catch (error) {

        next(new HttpError(error.message, 500));

    }
};
const addAllcafeData = async (req,res,next) =>{
    try {
        const cafe = await cafe.find({});

        if (cafe.length <=0) {
            res.status(200).json({success: true,message:"No cafe data found"});
        }

        res.status(200).json({
            success:true,
            total:cafe.length,
            message:"cafe data fetched succesfully",
            cafe,
        });
    } catch (error){
        next(new HttpError(error.message, 500));
    }
};

const getCafeById = async (req,res,next) => {
    try {
        const {ID} = req.params;

        const cafe = await cafe.findById(ID);

        if(!cafe){
            return next(new HttpError("cafe not found with this id",404));
        }

        res.status(200).json({success:true, message:"cafe found",cafe });
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
};

// const updateCafe = async (req,res,next) =>{
//     try {
//         const {id} = req.params;

//         const updateCafeData = await Cafe.findByIdAndUpdate(id, req.body, {
//             new:true,
//         })

//         if(!updateCafeData){
//             return next(new HttpError("cafe data not updated", 400));
//         }

//         res.status(200).json({
//             success:true,
//             message:"cafe data updated successfully",
//             updateCafeData,
//         });
        
//     } catch (error) {
//         return next(new HttpError(error.message,500));
        
//     }
// };

const updateDataManually = async (req,res,next) => {
    try {
        const {id} = req.params;

        const cafeUpdate = await cafe.findById(id);

        if(!cafeUpdate) {
            return next(new HttpError("cafe not found this id", 404));
        }

        const updates = Object.keys(req.body);

        console.log("updates",updates);

        const allowedFields = ["name","email","mobileNumber"];

        const isValidUpdate = updates.every((u) => allowedFields.includes(u));

        console.log("is valid update",isValidUpdate);

        if (!isValidUpdate){
            return next(new HttpError("only allowed field can be update", 400));
        }

        updates.forEach((update) => (cafeUpdate[update] = req.body[update]));

        await cafeUpdate.save();

        res.status(200).json({
            success:true,
            message:"cafe updated successfully",
            cafeUpdate,
        });
    } catch (error) {
        return next(new HttpError(error.message,500))
        
    }
};


const deleteCafe = async (req,res,next)=>{
    try {
        const {id} = req.params;

        const deleteCafe = await cafe.findByIdAndDelete(ID);
           if(!deleteCafe){
            return next(new HttpError("cafe not deleted this id", 400));
        
    }
    res.status(200).json({success:true, message:"cafe data deleted successfully"});
    
    } catch (error){
        next(new HttpError(error.message, 500));
    }

 
};

const deleteAllData = async (req,res,next)=> {
    try {
        const deletedData = await cafe.deleteMany();

        if(!deletedData){
            return next(new HttpError("Failed to delete data", 500));
        }

        res.status(200).json({
            success:true,
            message:"all cafe data deleted successfully",
        });
    } catch (error){
        return next(new HttpError(error.message, 500));
    }
};

export default {
    add,
    addAllcafeData,
    getCafeById,
    deleteCafe,
    deleteAllData,
    updateDataManually

}