import { useEffect, useState } from "react";
import useWorkoutContext from "./useWorkoutContext.js"

const useFetchWorkouts = () => {
    const {dispatch} = useWorkoutContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWorkouts = async () => {
            setLoading(true);

            try {
                const res = await fetch("/api/workouts");
                const jsonData = await res.json();
            
                if(!res.ok) {
                    setError(jsonData.error);
                }
                else {
                    setError(null);
                    dispatch({type: "SET_WORKOUTS", payload: jsonData.data});
                }

                console.log(jsonData);
                
            }
            catch(err) {
                console.log(`Error: ${err.message}`);
                setError(err.message);
            }
            finally {
                setLoading(false);
            }
        }

        fetchWorkouts();

    }, [dispatch]);

    return {loading, error};
}

export default useFetchWorkouts;