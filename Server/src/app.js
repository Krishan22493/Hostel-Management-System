import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// Setting configurations for the server
app.use(express.json({ limit: '16kb' })); // JSON accepted with limit 16kb
app.use(express.urlencoded({ extended: true })); // URL-encoded data accepted
app.use(express.static("public")); // Serve static files
app.use(cookieParser());

// Routes import
import userRouter from './routes/user.routes.js';
import adminRouter from './routes/admin.routes.js';
// Routes declaration using middleware

app.use("/api/v1/users", userRouter);  // Route prefix
app.use("/api/v1/admin", adminRouter);
app.get('/',(req,res) =>{
    res.send("Connected")
} )
export { app };
