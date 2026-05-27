const express = require("express");
const router = express.Router();

const prisma = require("../config/prisma");
const { askLegalAI } = require("../services/aiService");


// =====================
// Chat API
// =====================

router.post("/chat", async (req, res) => {

    try {

        const { question } = req.body;

        // Validation
        if (!question || question.trim() === "") {

            return res.status(400).json({
                success: false,
                error: "Question is required"
            });

        }

        // Ask AI
        const response = await askLegalAI(question);


        // Temporary demo user
        let user = await prisma.user.findFirst();

        if (!user) {

            user = await prisma.user.create({

                data: {
                    email: "demo@apkavakeel.com",
                    name: "Demo User"
                }

            });

        }


        // Save chat
        const chat = await prisma.chat.create({

            data: {
                question,
                response,
                userId: user.id
            }

        });


        res.json({

            success: true,
            response,
            chatId: chat.id

        });

    }

    catch (error) {

        console.error(
            "Chat Error:",
            error
        );

        res.status(500).json({

            success: false,
            error: error.message

        });

    }

});



// =====================
// Get chat history
// =====================

router.get("/history", async(req,res)=>{

    try{

        const chats = await prisma.chat.findMany({

            orderBy:{
                createdAt:"desc"
            }

        });

        res.json({

            success:true,
            chats

        });

    }

    catch(error){

        console.error(
            "History Error:",
            error
        );

        res.status(500).json({

            success:false,
            error:error.message

        });

    }

});


module.exports = router;