import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";


const app = express();

//app.use()   //express method used to register/add middleware runs for every incoming requests.
//parse= read raw data, understand its format and convert into Javascript Object



// Security
app.use(helmet());  //adds security-related HTTP headers to protect an Express application from common web attacks.


// CORS
app.use(
    cors({  //allows or restricts cross-origin requests between a client and a server.
        origin: process.env.CLIENT_URL,
        credentials: true
    })
);


// Parse/convert JSON into a JavaScript object and stores it in req.body. || frontend -> express.json() -> req.body
app.use(express.json());



// Parse URL-encoded Form Data and store in req.body
app.use(express.urlencoded({ extended: true }));



// parses cookies from the request and stored in req.cookies.
app.use(cookieParser());



// HTTP Request Logger that logs HTTP requests for debugging and monitoring.
app.use(morgan("dev"));






export default app;




























