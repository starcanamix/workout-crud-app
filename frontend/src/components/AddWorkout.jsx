import React, { useState } from 'react'
import useWorkoutContext from '../hooks/useWorkoutContext.js';
import useAuthContext from '../hooks/useAuthContext.js';

const AddWorkout = () => {
    const [workout, setWorkout] = useState({
        title: "",
        load: "",
        reps: ""
    });

    const [emptyFields, setEmptyFields] = useState([]);
    const {dispatch} = useWorkoutContext();
    const {user} = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const {name, value} = e.target;

        setWorkout({...workout, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/workouts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                },
                body: JSON.stringify(workout)
            });

            const jsonData = await res.json();
            console.log(jsonData);
            

            if(res.status === 400) {
                setError(jsonData.error);
                setEmptyFields([...jsonData.emptyFields]);
            }
            else if(res.ok) {
                setError(null);
                setWorkout({
                    title: "",
                    load: "",
                    reps: ""
                });
                setEmptyFields([]);
                console.log("New workout added: ", jsonData.data);
                dispatch({type: "ADD_WORKOUT", payload: jsonData.data});
            }
        }
        catch(err) {
            console.log(`Error: ${err.message}`);
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className='col-start-2'>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center items-start gap-5'>
                <h3 className='text-l font-bold'>Add a New Workout</h3>

                <div className='flex flex-col gap-2'>
                    <label>Exercize title:</label>
                    <input onChange={handleChange} value={workout.title} className={`${emptyFields.includes("title") ? "border-red-600" : "border-gray-500"} border-[1px] border-solid shadow-xl shadow-gray-100 rounded-[10px] p-1`} type="text" name="title" />
                </div>

                <div className='flex flex-col gap-2' >
                    <label>Load (kg):</label>
                    <input onChange={handleChange} value={workout.load} className={`${emptyFields.includes("load") ? "border-red-600" : "border-gray-500"} border-[1px] border-solid border-gray-500 shadow-xl shadow-gray-100 rounded-[10px] p-1`} type="number" name="load" />
                </div>

                <div className='flex flex-col gap-2' >
                    <label>Reps:</label>
                    <input onChange={handleChange} value={workout.reps} className={`${emptyFields.includes("reps") ? "border-red-600" : "border-gray-500"} border-[1px] border-solid border-gray-500 shadow-xl shadow-gray-100 rounded-[10px] p-1`} type="number" name="reps" />
                </div>

                <button disabled={loading} className='flex items-center justify-center bg-green-600 text-white p-1 rounded-[10px] hover:cursor-pointer hover:bg-green-500' type="submit">Add Workout</button>
                {
                    error &&
                    <div className='border-[1px] border-solid border-red-600 p-1 text-red-600 max-w-[240px]'>{error}</div>
                }
            </form>
        </div>
    )
}

export default AddWorkout;