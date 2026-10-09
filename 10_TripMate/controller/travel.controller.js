import Travel from "../model/travel.model.js";
import HttpError from "../middleware/HttpError.js";
import cloudinary from "../config/cloudinary.js"

const add = async (req, res, next) => {
  try {
    const {
      destination,
      country,
      packageName,
      duration,
      price,
      description,
    } = req.body;

    const travelImage = req.files?.travelImage?.[0]?.path;

    if (
      !destination ||
      !country ||
      !packageName ||
      !duration ||
      !price ||
      !travelImage ||
      !description
    ) {
      return next(new HttpError(400, "All fields are required"));
    }

    const newTravel = new Travel({
      destination,
      country,
      packageName,
      duration,
      price,
      travelImage,
      description,
    });

    await newTravel.save();

    res.status(201).json({
      success: true,
      message: "New travel package added successfully",
      newTravel,
    });
  } catch (error) {
    next(new HttpError(500, error.message));
  }
};

export default { add };
