const express = require("express");
const router = express.Router();

const {
    generateDocument
} = require("../services/documentService");


router.post("/generate", async(req,res)=>{

    try{

        const {
            type,
            details
        } = req.body;


        if(!type){

            return res.status(400).json({

                success:false,
                error:"Document type required"

            });

        }


        const document = await generateDocument(
            type,
            details
        );


        res.json({

            success:true,
            document

        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            success:false,
            error:"Document generation failed"

        });

    }

});

module.exports = router;