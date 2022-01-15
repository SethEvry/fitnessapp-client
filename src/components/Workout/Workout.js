import "./workout.css";
import { useContext } from "react";

import { Modal } from "..";
import { ModalContext } from "../../context/ModalContext";
import { uid } from "uid";

export default function Workout({ workOut }) {
  const { state, dispatch } = useContext(ModalContext);

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
                  <p key={uid()}>{set}</p>
                ))}
            </div>
          ) : null}
          {workOut.description 
          ?<p className="workout_description">{workOut.description}</p>
          : null}
        </Modal>
      ) : null}
    </>
  );
}
