import express from "express";
import { createWorkout, deleteWorkout, getAllWorkouts } from "../controllers/workout.controller.js";

const router = express.Router();

router.get("/", getAllWorkouts);
router.post("/", createWorkout);
router.delete("/:id", deleteWorkout);

export default router;