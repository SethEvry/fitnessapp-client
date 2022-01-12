import "./column.css";
import { useState } from "react";

//component
import { Workout } from "..";

//react-icons
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IconContext } from "react-icons/lib";

export default function Column({ day }) {
  const dayName = day
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase();
  const [workOuts, setWorkOuts] = useState([]);
  const exercises = ["bench, brah", "dl, dude", "squat, man", "pelvic thrust!", "curl, coolio", "plank, punk"]

    const handleClick = () => {
        const randomNum = Math.floor(Math.random()*exercises.length);
        setWorkOuts(oldWorkOuts => [...oldWorkOuts, exercises[randomNum]])

    }
  

  return (
    <div className={`${dayName} column`}>
      <div className="column__header">
        <h3>{day.toLocaleDateString("en-US")}</h3>
      </div>
      <div className="column__content">
        {workOuts.map((workOut, index) => (
          <Workout key={index} workOut={workOut} />
        ))}
        <IconContext.Provider
          value={{
            className: "column__plus",
          }}
        >
          <AiOutlinePlusCircle
            className="column__plus"
            onClick={handleClick}
          />
        </IconContext.Provider>
      </div>
    </div>
  );
}
