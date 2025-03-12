import dotenv from "dotenv";
import express from "express";
import connectDB from "./databases/index.js"
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config({ path: './.env'});
const PORT = process.env.PORT || 8001;

const app = express();
// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
