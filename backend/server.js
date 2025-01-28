import express from "express";
import dotenv from "dotenv";
import workoutRoutes from "./routes/workout.router.js";
import connectDb from "./config/db.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use("/api/workouts", workoutRoutes);

app.listen(process.env.PORT, async () => {
    await connectDb();

    console.log("Server is listening on http://localhost:5000")
});