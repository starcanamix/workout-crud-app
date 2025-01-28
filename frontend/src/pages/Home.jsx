import React from 'react'
import Workouts from '../components/Workouts';
import AddWorkout from '../components/AddWorkout';

const Home = () => {
  return (
    <div id="home" className='py-[120px] grid grid-cols-[1fr_30%] gap-[10%] px-[5%]'>
        <AddWorkout />
        <Workouts />
    </div>
  )
}

export default Home;