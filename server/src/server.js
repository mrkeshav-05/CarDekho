import dotenv from "dotenv";
import express from "express";
import connectDB from "./databases/index.js"
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import cors from "cors";

import authroutes from './routes/auth.route.js';
import reviewroutes from './routes/reviews.route.js';
import userroutes from './routes/user.route.js';
import conversationroutes from './routes/conversation.route.js';
import messageroutes from './routes/messages.route.js';
import triproutes from './routes/trips.route.js';
import bookingroutes from './routes/booking.route.js';
// import paymentroutes from './routes/payment.route.js';
import notificationroutes  from './routes/notifications.route.js'

dotenv.config({ path: './.env'});
const PORT = process.env.PORT || 8001;

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


// import routes
app.use("/api/auth",authroutes)
app.use("/api/reviews",reviewroutes)
app.use("/api/user",userroutes)
app.use("/api/conversation",conversationroutes)
app.use("/api/message",messageroutes)
// app.use("/api/payment",paymentroutes)
app.use("/api/trip",triproutes)
app.use("/api/booking",bookingroutes)
app.use("/api/notifications",notificationroutes)

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "ERROR";
    console.log(err);
    return res.status(status).json({
        success: false,
        status,
        message,
    })
})

app.get('/', function (req, res) {
    res.send('Hello World!');
});
//server listens on port 3001
connectDB()
    .then(() => {
        app.on('error', (error) => {
            console.log("Error connecting to database : " + error)
            throw error;
        })
        app.listen(process.env.PORT || 8000, () => {
            console.log('Server is running on port: ' + process.env.PORT)
            console.log(`http://localhost:${process.env.PORT || 8000}`)
        });
        // app.listen(process.env.PORT, '0.0.0.0', () => {
        //   console.log(`Server running at http://0.0.0.0:${process.env.PORT}`);
        // });
    })
    .catch((error) => {
        console.log("MongoDB database connection failed!!!: " + error)
        throw error;
    })
// /Users/keshavthakur/Desktop/NeedNear/server/index.js
