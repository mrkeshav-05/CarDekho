import dotenv from "dotenv";
import express from "express";
import connectDB from "./databases/index.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

import authroutes from "./routes/auth.route.js";
import reviewroutes from "./routes/reviews.route.js";
import userroutes from "./routes/user.route.js";
import conversationroutes from "./routes/conversation.route.js";
import messageroutes from "./routes/messages.route.js";
import triproutes from "./routes/trips.route.js";
import bookingroutes from "./routes/booking.route.js";
import notificationroutes from "./routes/notifications.route.js";
import http from "http";

// socket
import initializeSocket from "./socket/socket.js";


dotenv.config({ path: "./.env" });
const PORT = process.env.PORT || 8001;


const app = express();
const server = http.createServer(app);
const io = initializeSocket(server);



// ✅ CORS configuration
app.use(cors({
    origin: "http://localhost:5173",  // Change this to your frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Cross-Origin Policies (Fixes COOP & COEP issues)
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    next();
});

// ✅ API Routes
app.use("/api/auth", authroutes);
app.use("/api/reviews", reviewroutes);
app.use("/api/user", userroutes);
app.use("/api/conversation", conversationroutes);
app.use("/api/message", messageroutes);
app.use("/api/trip", triproutes);
app.use("/api/booking", bookingroutes);
app.use("/api/notifications", notificationroutes);

// ✅ Global error handler
app.use((err, req, res, next) => {
    console.error("🔥 Server Error:", err);
    const status = err.status || 500;
    return res.status(status).json({
        success: false,
        status,
        message: err.message || "Internal Server Error",
    });
});

// ✅ Root Route
app.get("/", (req, res) => {
    res.send("🚀 Server is up and running!");
});

// ✅ Start Server after DB Connection
connectDB()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`✅ Server is running at: http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("❌ MongoDB connection failed:", error);
        process.exit(1); // Ensure the process exits if DB fails
    });