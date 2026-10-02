import eventModel from "../model/EventModel.js";
import HttpError from "../middleware/HttpError.js"
import fs from "fs";

const add = async(req,res,next)=>{

    try{

        const {EventName,EventDescription,EventVenue,EventTicketPrice,EventDate} = req.body;

      const EventPoster = req.files?.EventPoster?.[0]?.path || null;
      const EventImg = req.files?.EventImg?.map((file)=>file.path)||null;
      const EventBanner = req.files?.EventBanner?.map((file)=>file.path)||null;
      const EventSpeakers = req.files?.EventSpeakers?.map((file)=>file.path)||null;
      const EventDocument = req.files?.EventDocument?.map((file)=>file.path)||null; 

      const newEvent = await eventModel.create({

        EventName,
        EventDescription,
        EventVenue,
        EventTicketPrice,
        EventDate,
        EventImg,
        EventPoster,
        EventBanner,
        EventSpeakers,
        EventDocument
      })

      res.status(201).json({success:true,message:"New Event create",newEvent })

    }catch(error){
        return next(new HttpError(error.message,500))
    }

};
const showAllEvent = async (req, res, next) => {
  try {
    const events = await Event.find({});

    if (events.length === 0) {
      return res
        .status(404)
        .json({ success: true, message: "no event data found", data: null });
    }

    res.status(200).json({
      success: true,
      message: "all event data fetched successfully",
      total: events.length,
      data: events,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};
const eventById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    console.log("event", event);

    if (!event) {
      return next(new HttpError("no event data found with this id", 404));
    }

    res
      .status(200)
      .json({ success: true, message: "event data found", data: event });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteEvent = await Event.findByIdAndDelete(id);
    if (!deleteEvent) {
      return next(new HttpError("failed to delete event", 400));
    }

    const filesToDelete = [
      ...deleteEvent.eventImages,
      deleteEvent.eventPoster,
      deleteEvent.eventBanners,
      ...deleteEvent.eventSpeakers,
      ...deleteEvent.eventDocuments,
    ];

    filesToDelete.forEach((file) => {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      } else {
        return next(new HttpError("failed to delete file"));
      }
    });

    return res.status(200).json({ success: true, message: "event deleted" });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    console.log("update event", event);

    if (!event) {
      return next(new HttpError("no event data found with this id", 404));
    }

    const updates = Object.keys(req.body);

    const allowedFields = [
      "eventName",
      "eventDate",
      "eventDescription",
      "eventVenue",
      "ticketPrice",
    ];

    const isValidUpdates = updates.every((field) =>
      allowedFields.includes(field),
    );

    if (!isValidUpdates) {
      return next(new HttpError("only allowed field can be updated", 400));
    }

    if (req.files?.eventImages) {
      event.eventImages.forEach((file) => {
        if (fs.existsSync(file)) {
          fs.unlinkSync(file);
        }
      });

      event.eventImages =
        req.files?.eventImages?.map((file) => file.path) || null;
    }

    updates.forEach((update) => {
      event[update] = req.body[update];
    });

    await event.save();

    res.status(200).json({
      success: true,
      message: "event data updated successfully",
      event,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};


export default {add, showAllEvent, eventById, deleteEvent, updateEvent};

