import { useState, useRef, useEffect } from "react";
import { uid } from "uid";

import './setsnreps.css';

//react-icons
import { AiOutlineMinusCircle } from "react-icons/ai";
// import { IconContext } from "react-icons/lib";

const SetsnReps = ({ sets, setSets, setStep }) => {
  const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState([]);
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("WEIGHT");

  const focusEl = useRef("");
  useEffect(() => {
    focusEl.current.focus();
  }, [type]);

const reset = () => {
  setIsError(false);
  setErrors([]);
  setReps("");
  setWeight("");
  setTime("");
  focusEl.current.focus();
}

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reps && weight && type === "WEIGHT") {
      const fWeight = parseInt(weight)? weight + ' lbs' : weight;
      setSets((oldSets) => [...oldSets, `x${reps} - ${fWeight}`]);
      reset();
    } else if (time && type === "TIME") {
      setSets((oldSets) => [...oldSets, `${time} seconds`]);
      reset();
    } else if(sets.length && (!reps && !weight && !time)) {
      reset();
      setStep(2);
    } else {
      setIsError(true);
      setErrors([reps || "reps", weight || "weight"]);
    }
  };
  return (
    <>
      {sets.length
        ? sets.map((set) => (
            <div key={uid()}>
              <h2>{set}</h2>
              <AiOutlineMinusCircle
                onClick={() =>
                  setSets((oldSets) =>
                    oldSets.filter((setToKeep) => setToKeep !== set)
                  )
                }
              />
            </div>
          ))
        : ""}
      <form onSubmit={handleSubmit}>
        {isError
          ? errors.map((error) => <p key={error}>You are Missing: {error}</p>)
          : null}
        <select defaultValue="WEIGHT" onChange={(e) => setType(e.target.value)}>
          <option value="WEIGHT">Weight</option>
          <option value="TIME">Time</option>
        </select>
        {
          {
            WEIGHT: (
              <>
                <input
                  type="text"
                  placeholder="reps"
                  value={reps}
                  ref={focusEl}
                  onChange={(e) => setReps(e.target.value)}
                />

                <h1>-</h1>
                <input
                  type="text"
                  placeholder="Weight (Pounds)"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </>
            ),
            TIME: (
              <input
                type="text"
                placeholder="time (seconds)"
                value={time}
                ref={focusEl}
                onChange={(e) => setTime(e.target.value)}
              />
            ),
          }[type]
        }
        <button className="setsnreps_button">Submit</button>
      </form>
    </>
  );
};

export default SetsnReps;
