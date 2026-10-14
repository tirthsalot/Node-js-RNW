import Travel from "../model/travel.model.js";
import HttpError from "../middleware/HttpError.js";
import cloudinary from "../config/cloudinary.js";

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
      return next(new HttpError(404, "No package data found"));
    }

    res.status(200).json({
      success: true,
      total: packages.length,
      message: "All packages fetched successfully",
      packages,
    });
  } catch (error) {
    next(new HttpError(500, error.message));
  }
};

const getPackageById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const travelPackage = await Travel.findById(id);

    if (!travelPackage) {
      return next(new HttpError(404, "Package not found with this ID"));
    }

    res.status(200).json({
      success: true,
      message: "Package found successfully",
      travelPackage,
    });
  } catch (error) {
    next(new HttpError(500, error.message));
  }
};

const deletePackage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const travelPackage = await Travel.findById(id);

    if (!travelPackage) {
      return next(new HttpError(404, "Package not found"));
    }

    await travelPackage.deleteOne();

    res.status(200).json({
      success: true,
      message: "Package deleted successfully",
    });
  } catch (error) {
    next(new HttpError(500, error.message));
  }
};

const updatePackageDetail = async (req, res, next) => {
  try {
    const { id } = req.params;

    const travelPackage = await Travel.findById(id);

    if (!travelPackage) {
      return next(new HttpError(404, "Package not found"));
    }

    const allowedFields = [
      "destination",
      "country",
      "packageName",
      "duration",
      "price",
      "description",
    ];

    const updates = Object.keys(req.body);

    const isValidUpdates = updates.every((field) =>
      allowedFields.includes(field)
    );

    if (!isValidUpdates) {
      return next(
        new HttpError(400, "Only allowed fields can be updated")
      );
    }

    updates.forEach((field) => {
      travelPackage[field] = req.body[field];
    });

    const travelImage = req.files?.travelImage?.[0]?.path;

    if (travelImage) {
      travelPackage.travelImage = travelImage;
    }

    await travelPackage.save();

    res.status(200).json({
      success: true,
      message: "Package updated successfully",
      travelPackage,
    });
  } catch (error) {
    next(new HttpError(500, error.message));
  }
};

export default {
  add,
  getAllPackages,
  getPackageById,
  deletePackage,
  updatePackageDetail,
};
