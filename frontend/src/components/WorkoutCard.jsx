import React from 'react';
import { formatDistanceToNow } from "date-fns";
import { FaTrashAlt } from "react-icons/fa";
import useWorkoutContext from '../hooks/useWorkoutContext.js';
import useAuthContext from '../hooks/useAuthContext.js';

const WorkoutCard = ({workout}) => {
  const {dispatch} = useWorkoutContext();
  const {user} = useAuthContext();

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/workouts/${workout._id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      });

      const jsonData = await res.json();
      console.log(jsonData);
      
      if(!res.ok) throw Error(jsonData.error);
      else dispatch({type: "DELETE_WORKOUT", payload: workout._id});
    }
    catch(err) {
      console.log(`Error: ${err.message}`);
    }  
  }

  return (
    <div className='flex justify-between items-center bg-gray-500 rounded-[5px] w-full p-2'>
      <div className='flex flex-col gap-3'>
        <h3 className='text-xl font-bold text-green-400'>{workout.title}</h3>
        <div>
            <h4><span className='font-bold'>Load (kg):</span> {workout.load}</h4>
            <h4><span className='font-bold'>Reps:</span> {workout.reps}</h4>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
        </div>
      </div>
      <button onClick={handleDelete} className='text-xl hover:cursor-pointer'><FaTrashAlt /></button>
    </div>
  )
}

export default WorkoutCard;