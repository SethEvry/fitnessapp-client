import "./workout.css";
import { useContext } from "react";

import { Modal } from "..";
import { ModalContext } from "../../context/ModalContext";

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
              <h2>
                {workOut.sets.map((set) => (
                  <p key={set}>{set}</p>
                ))}
              </h2>
            </div>
          ) : null}
          <p>{workOut.description}</p>
        </Modal>
      ) : null}
    </>
  );
}
