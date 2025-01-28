import React from 'react'
import WorkoutCard from './WorkoutCard'
import useFetchWorkouts from '../hooks/useFetchWorkouts.js'
import useWorkoutContext from '../hooks/useWorkoutContext.js';

const Workouts = () => {
    const {workouts} = useWorkoutContext();
    const {loading, error} = useFetchWorkouts();

    if(error) {
        console.log(`Error: ${error}`);
        return <div className='grid-cols-1 row-start-1 text-2xl font-bold'>An Error occurred!</div>
    }
    if(loading) return <div className='grid-cols-1 row-start-1 text-2xl font-bold'>Loading...</div>

    return (
        <ul className='flex flex-col gap-5 text-white grid-cols-1 row-start-1'>
            {
                workouts.map((workout, i) => (
                    <li key={i}>
                        <WorkoutCard
                        workout={workout} />
                    </li>     
                ))
            }

        </ul>
    )
}

export default Workouts