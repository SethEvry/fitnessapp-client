import './column.css';
import { useState } from 'react';

export default function Column({day}) {
    const dayName = day.toLocaleDateString('en-US', {weekday: 'long'}).toLowerCase();
    const [workOuts, setWorkOuts] = useState([]);


    return (
        <div className ={`${dayName} column`}>
            <div className="column__header">
                <h3>{day.toLocaleDateString('en-US')}</h3>
            </div>
            <div className="column__content">
                    {
                        workOuts.map((workOut, index) =>(
                            <div className="workout" key={index} onClick={() => setWorkOuts(oldWorkOuts => oldWorkOuts.slice(0, oldWorkOuts.length -1))}><p>{workOut}</p></div>
                        ))
                    }
                <h1 onClick={() => setWorkOuts(arr => [...arr, 'bench, brah'])}>+</h1>
            </div>
        </div>
    )
}
