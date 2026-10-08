import mongoose from "mongoose";

const travelSchema = new mongoose.Schema(
  {
    destination: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    packageName: {
      type: String,
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    travelImage: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Travel = mongoose.model("Travel", travelSchema);

export default Travel;