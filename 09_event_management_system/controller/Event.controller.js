import eventModel from "../model/EventModel.js";
import httpError from "../middleware/httpError.js"
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
        return next(new httpError(error.message,500))
    }

}

export default {add};