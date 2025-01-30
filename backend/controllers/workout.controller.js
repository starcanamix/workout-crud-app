import mongoose from "mongoose";
import Workout from "../models/workout.model.js"

export const getAllWorkouts = async (req, res) => {
    try {
        const user_id = req.user;
        const workouts = await Workout.find({user_id}).sort({createdAt: -1});
        if(!workouts)
            return res.status(400).json({error: "No workouts were found!"});

        res.status(200).json({data: workouts});
    }
    catch(err) {
        console.log(`Error: ${err.message}`);
        res.status(500).json({error: "Error while fetching the workouts!"})
    }

}

export const createWorkout = async (req, res) => {
    const workout = req.body;
    
    const emptyFields = [];
    if(workout?.title === "") emptyFields.push("title");
    if(workout?.load === "") emptyFields.push("load");
    if(workout?.reps === "") emptyFields.push("reps");

    if(emptyFields.length > 0) return res.status(400).json({error: "Please fill in all the fields!", emptyFields});

    try {
        const user_id = req.user;
        const newWorkout = await Workout.create({...workout, user_id});
        if(!newWorkout)
            return res.status(400).json({error: "Workout couldn't be created!"}); 

        res.status(200).json({data: newWorkout});
    }
    catch(err) {
        console.log(`Error: ${err.message}`);
        res.status(500).json({error: "Error while creating the workout!"})
    }
}

export const deleteWorkout = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({error: "No such workout!"})

    try {
        const workout = await Workout.findOneAndDelete({_id: id});
        if(!workout)
            return res.status(400).json({error: "No such workout!"});

        res.status(200).json({data: workout});
    }
    catch(err) {
        console.log(`Error: ${err.message}`);
        res.status(500).json({error: "Error while deleting the workout!"})
    }
}