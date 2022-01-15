import { createContext, useEffect, useState } from "react";
import exercises from '../exercises.json'
import { uid } from 'uid';

const formatedExercises = exercises.map(e => {return {...e, id: uid()}})

export const WorkoutContext = createContext();


const WorkoutContextProvider = ({children}) => {
    const [workOuts, setWorkOuts] = useState([]);

    useEffect(()=>{
        if(localStorage.getItem('workOuts')){
            setWorkOuts(JSON.parse(localStorage.getItem('workOuts')));
        }
    }, [])
    useEffect(()=>{
        localStorage.setItem("workOuts", JSON.stringify(workOuts));

    },[workOuts])

    return (
        <WorkoutContext.Provider value={{workOuts, setWorkOuts}}>
            {children}
        </WorkoutContext.Provider>
    )
}

export default WorkoutContextProvider
