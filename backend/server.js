require("dotenv").config();

const express = require("express");
const cors = require("cors");

const aiRoutes =
require("./routes/aiRoutes");

const documentRoutes =
require("./routes/documentRoutes");

const documentGeneratorRoutes =
require("./routes/documentGenerator");

const rightRoutes =
require("./routes/rightRoutes");

const app = express();

const corsOrigin = process.env.CORS_ORIGIN;

app.use(cors({
    origin: corsOrigin ? corsOrigin.split(",").map((origin) => origin.trim()) : "*",
}));

app.use(express.json());



// API routes

app.use(
    "/api/ai",
    aiRoutes
);

app.use(
    "/api/documents",
    documentRoutes
);

app.use(
    "/api/generator",
    documentGeneratorRoutes
);

app.use(
    "/api/rights",
    rightRoutes
);



// Health check

app.get("/", (req,res)=>{

    res.json({

        status:"running",

        project:"Apka Vakeel Backend"

    });

});



const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";

app.listen(PORT,HOST,()=>{

    console.log(
        `Server running on port ${PORT}`
    );

});
