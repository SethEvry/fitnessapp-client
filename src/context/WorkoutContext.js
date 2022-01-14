import { createContext, useState } from "react";
import exercises from '../exercises.json'
import { uid } from 'uid';

const formatedExercises = exercises.map(e => {return {...e, id: uid()}})

export const WorkoutContext = createContext();


const WorkoutContextProvider = ({children}) => {
    const [workOuts, setWorkOuts] = useState(formatedExercises);

    return (
        <WorkoutContext.Provider value={{workOuts, setWorkOuts}}>
            {children}
        </WorkoutContext.Provider>
    )
}

export default WorkoutContextProvider
