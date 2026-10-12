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
const getAllPackages = async (req, res, next) => {
  try {
    const packages = await Travel.find();

    if (packages.length === 0) {
      return next(new HttpError("no package data found", 404));
    }

    res.status(200).json({
      success: true,
      total: packages.length,
      message: "all packages data fetched successfully",
      packages,
    });
  } catch (error) {
    next(new httpError(error.message, 500));
  }
};
const getPackageById = async (req, res, next) => {
  try {
    const {id} = req.params;

    const TravelPackage = await Travel.findById(id);

    if (!TravelPackage) {
      return next(new HttpError("package not found with this id", 404));
    }

    res
      .status(200)
      .json({ success: true, message: "package found", TravelPackage });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};
const deletePackage = async (req, res, next) => {
  try {
    const id = req.params.id;

    const packageDelete = await Travel.findById(id);

    if (!packageDelete) {
      return next(new HttpError("failed to delete this package", 400));
    }

    await cloudinary.uploader.destroy(packageDelete.cloudinary_id);

    await packageDelete.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "package delete successfully" });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};


export default {add,getAllPackages,getPackageById,deletePackage};

