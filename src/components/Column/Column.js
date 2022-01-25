import "./column.css";
import { useContext } from "react";
import { uid } from "uid";

//component
import { Workout } from "..";

//react-icons
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IconContext } from "react-icons/lib";

import { ModalContext } from "../../context/ModalContext";
import { WorkoutContext } from "../../context/WorkoutContext";
import { CalendarContext } from "../../context/CalendarContext";

export default function Column({ day }) {
  
  const dayName = day
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase();
  const date = day.toISOString().slice(0, 10);

  const { workOuts } = useContext(WorkoutContext);
  const { dispatch } = useContext(ModalContext);
  const { today } = useContext(CalendarContext);
  const current =
    day.toLocaleDateString("en-US") === today.toLocaleDateString("en-US")
      ? "column_current"
      : "";

  const handleClick = () => {
    dispatch({ type: "ADDING", payload: date });
  };

  return (
    <div className={`${dayName} column ${current}`}>
      <div className="column__header">
        <h3>{day.toLocaleDateString('en-US', {weekday:"short", day:"2-digit", month:"2-digit", year:"numeric"})}</h3>
      </div>
      <div className="column__content">
        {workOuts
          .filter((workOut) => workOut.date === date)
          .map((workOut) => (
            <Workout key={uid()} workOut={workOut} />
          ))}
        <IconContext.Provider
          value={{
            className: "column__plus",
          }}
        >
          <AiOutlinePlusCircle className="column__plus" onClick={handleClick} />
        </IconContext.Provider>
      </div>
    </div>
  );
}
