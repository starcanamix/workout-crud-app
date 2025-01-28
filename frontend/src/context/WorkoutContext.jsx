import { createContext, useReducer } from "react";

export const WorkoutContext = createContext(null);

const workoutsReducer = (state, action) => {
    switch(action.type) {
        case "SET_WORKOUTS":
            return {
                workouts: action.payload
            }
        case "ADD_WORKOUT": 
            return {
                workouts: [action.payload, ...state.workouts]
            }
        case "DELETE_WORKOUT":
            return {
                workouts: state.workouts.filter(workout => workout._id !== action.payload)
            }
        default:
            return state;
    }
}

export const WorkoutContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: []
    });

    return (
        <WorkoutContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutContext.Provider>
    );
}