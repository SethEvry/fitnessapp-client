import { useState, useRef, useEffect } from "react";

//react-icons
import { GrCaretNext } from "react-icons/gr";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IconContext } from "react-icons/lib";

const SetsnReps = ({ setSets, setStep }) => {
  const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState([]);
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("WEIGHT");

  const focusEl = useRef("")
  useEffect(()=>{
    focusEl.current.focus()
  }, [type])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reps && weight) {
      setIsError(false);
      setErrors([]);
      setSets((oldSets) => [...oldSets, `${reps} - ${weight} lbs`]);
      setStep(2);
    } else if (time) {
      setIsError(false);
      setErrors([]);
      setSets((oldSets) => [...oldSets, `${time} seconds`]);
      setStep(2);
    } else {
      setIsError(true);
      setErrors([reps || "reps", weight || "weight"]);
    }
  };
  const handleAdditional = (e) => {
    e.preventDefault();
    if (type === "WEIGHT") {
      setSets((oldSets) => [...oldSets, `${reps} - ${weight} lbs`]);
    } else if (type === "TIME") {
      setSets((oldSets) => [...oldSets, `${time} seconds`]);
    }
    setReps("");
    setWeight("");
    setTime("");
  };
  return (
    <form onSubmit={handleSubmit}>
      {isError
        ? errors.map((error) => <p key={error}>You are Missing: {error}</p>)
        : null}
      <select onChange={(e) => setType(e.target.value)}>
        <option hidden value="DEFAULT">
          Select Type
        </option>
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
      <IconContext.Provider value={{ className: "setsnreps-next" }}>
        <AiOutlinePlusCircle onClick={handleAdditional} />
      </IconContext.Provider>
      <button>
        <IconContext.Provider value={{ className: "setsnreps-next" }}>
          <GrCaretNext />
        </IconContext.Provider>
      </button>
    </form>
  );
};

export default SetsnReps;
