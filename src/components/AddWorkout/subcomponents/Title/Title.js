import { useState, useRef, useEffect, useContext } from "react";
import { uid } from "uid";
import "./title.css";

//context
import { WorkoutContext } from "../../../../context/WorkoutContext";

const Title = ({ title, setTitle, setStep }) => {
  const [isError, setIsError] = useState(false);
  const { workOuts } = useContext(WorkoutContext);

  //focus ref
  const focusEl = useRef("");
  useEffect(() => {
    focusEl.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      setIsError(false);
      setStep(1);
    } else {
      setIsError(true);
    }
  };
  return (
    <>
      <form className="addworkout_title" onSubmit={handleSubmit}>
        {isError ? <p>It needs a title!</p> : null}
        <input
          type="text"
          placeholder="Title"
          value={title}
          ref={focusEl}
          onChange={(e) => setTitle(e.target.value)}
        />
      </form>
      {workOuts.length ? (
        <div className="addworkout_suggestion-container">
          {workOuts
            .filter((workOut) => workOut.title.includes(title))
            .reduce(
              (newWorkOuts, workOut) =>
                !newWorkOuts.includes(workOut.title)
                  ? [...newWorkOuts, workOut.title]
                  : [...newWorkOuts],
              []
            )
            .slice(0, 5)
            .map((workOut) => (
              <div
                key={uid()}
                onClick={() => {
                  setTitle(workOut);
                  focusEl.current.focus();
                }}
                className="addworkout_suggestion"
              >
                <p>{workOut}</p>
              </div>
            ))}
        </div>
      ) : null}
    </>
  );
};

export default Title;
