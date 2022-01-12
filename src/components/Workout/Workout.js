import "./workout.css";
import { useState } from "react";

import Modal from "../Modal/Modal";

export default function Workout({ workOut }) {
  const [isModal, setIsModal] = useState(false);

  const handleModal = () => {
    setIsModal(!isModal);
  };

  return (
    <>
      <div className="workout" onClick={handleModal}>
        {workOut.title}
      </div>
      {isModal ? (
        <Modal handleModal={handleModal}>
          {workOut.sets && workOut.reps ? (
            <div className="sets">
              <h1>
                {workOut.sets} X {workOut.reps}{" "}
              </h1>
            </div>
          ) : null}
          <h2>{workOut.title}</h2>
          <p>{workOut.description}</p>
        </Modal>
      ) : null}
    </>
  );
}
