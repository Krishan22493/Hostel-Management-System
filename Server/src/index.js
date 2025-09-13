import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./db/config.js";

dotenv.config({ path: './.env' });

connectDB()
    .then(() => {
        app.listen(process.env.APP_PORT || 8000, () => {
            console.log(`Server is running at port: ${process.env.APP_PORT || 8000}`);
        });
    })
    .catch((err) => {
        console.error("MySQL connection failed", err);
    });
