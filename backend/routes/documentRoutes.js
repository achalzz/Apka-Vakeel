const express = require("express");
const multer = require("multer");

const router = express.Router();

const {
    analyzeDocument
} = require("../services/documentAnalysisService");

const upload = multer({
    storage: multer.memoryStorage(),
    limits:{
        fileSize:10*1024*1024
    }
});

router.post(
"/upload",
upload.single("document"),

async(req,res)=>{

try{

console.log("Upload request received");

if(!req.file){

console.log("No file found");

return res.status(400).json({
success:false,
error:"No file uploaded"
});

}

console.log(
"File:",
req.file.originalname
);

console.log(
"Size:",
req.file.size
);

const analysis =
await analyzeDocument(
req.file.buffer
);

console.log(
"Analysis complete"
);

res.json({

success:true,
analysis

});

}

catch(error){

console.log(
"UPLOAD ERROR:"
);

console.log(error);

res.status(500).json({

success:false,
error:error.message

});

}

}

);

module.exports = router;