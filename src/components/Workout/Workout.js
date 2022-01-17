import "./workout.css";
import { useContext } from "react";

import { Modal } from "..";
import { ModalContext } from "../../context/ModalContext";
import { uid } from "uid";
import { WorkoutContext } from "../../context/WorkoutContext";

export default function Workout({ workOut }) {
  const { state, dispatch } = useContext(ModalContext);
  const { setWorkOuts } = useContext(WorkoutContext);

  const handleDelete = () => {
    setWorkOuts(oldWorkOuts => oldWorkOuts.filter((oldWorkout) => oldWorkout !== workOut))
    dispatch({type: "CLOSE"});
  }

  return (
    <>
      <div
        className="workout"
        onClick={() => dispatch({ type: "VIEW", payload: workOut })}
      >
        {workOut.title}
      </div>
      {state.isModal && state.workOut.id === workOut.id ? (
        <Modal>
          <h1 className="workout-title">{workOut.title}</h1>
          {workOut.sets  ? (
            <div className="sets">        
                {workOut.sets.map((set) => (
                  // || operator so not to break old version
                  <p key={set.id || uid()}>{set.message || set}</p>
                ))}
            </div>
          ) : null}
          {workOut.description 
          ?<p className="workout_description">{workOut.description}</p>
          : null}
          <button onClick={handleDelete}>Delete</button>
        </Modal>
      ) : null}
    </>
  );
}
