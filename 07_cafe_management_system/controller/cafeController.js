import HttpError from "../middleware/httperror.js";
import Cafe from "../model/Cafedata.js";

const add = async (req, res, next) => {

    try {

        const { name, email, ID, menu } = req.body;

        const newCafe = new Cafe({
            name,
            email,
            ID,
            menu
        });

        await newCafe.save();

        res.status(201).json({
            success: true,
            message: "Cafe data added successfully"
        });

    } catch (error) {

        next(new HttpError(error.message, 500));

    }
};

export default add;