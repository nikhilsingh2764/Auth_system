import dotenv from "dotenv";
dotenv.config();              //dotenv loads environment variables from .env file into your application's environment(process.env)

import app from "./app.js";
import connectDB from "./config/db.js";


const PORT = process.env.PORT || 5000;


const startServer = async () => {

    try {

      await  connectDB();

        app.listen(PORT, () => {                               //method in express that starts the server 
            console.log(`server is running at port ${PORT} `);
            console.log(`http://localhost:${PORT}`);
        })


    } catch (error) {

        console.error("Server failed to start:", error.message);

    }



}

startServer();










