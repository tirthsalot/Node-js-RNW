import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        let folderName = "uploads/"

        if(file.fieldname === "EventImg"){
            folderName += "EventImg";
        }
        else if(file.fieldname === "EventPoster"){
            fieldname += "EventPoster";
        }
        else if(file.fieldname === "EventBanner"){
            fieldname += "EventBanner";
        }
        else if(file.fieldname === "EventSpeakers"){
            fieldname += "EventSpeakers";
        }
        else if(file.fieldname === "EventDocument"){
            fieldname += "EventDocument";
        }

        else{
            folderName = "other"
        }
        fs.mkdirSync(foldername,{recursive:true});

        return cb(null,folderName)
    }
})

const fileFilter = (req,file,cd)=>{

    const imgType = ["image/jpg","image/jpeg","image/png"];

    const documentType = ["application/pdf"];

    if(file.fieldname === "EventDocument"){
        if(documentType.includes(file.mimetype)){
                return cb(null,true);
        }else{
            cb(new Error("only pdf format is allowed"))
        }
    }else{
        if(imgType.includes(file.mimetype)){
            return cb(null,true);
        }
        else{
            cb(new Error("only jpg,jpeg or png format is allowed"))
        }
    }
}

const uploads = multer({
    storage,fileFilter,limits:{fileSize:5*1024*1024},
})

export default uploads;