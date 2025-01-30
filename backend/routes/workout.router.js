import express from "express";
import { createWorkout, deleteWorkout, getAllWorkouts } from "../controllers/workout.controller.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.use(requireAuth);

router.get("/", getAllWorkouts);
router.post("/", createWorkout);
router.delete("/:id", deleteWorkout);

export default router;