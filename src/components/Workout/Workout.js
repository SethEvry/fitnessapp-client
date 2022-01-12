import "./workout.css";
import ReactDOM from "react-dom";
import { useState } from "react";

//react-icons
import { IconContext } from "react-icons/lib";
import { AiFillCloseCircle } from 'react-icons/ai'

export default function Workout({ workOut, children }) {
  const [isModal, setIsModal] = useState(false);

  const handleModal = () => {
    setIsModal(!isModal);
  };

  return (
    <>
    <div className="workout" onClick={handleModal}>
      {workOut}
    </div>
    {isModal?
    ReactDOM.createPortal(
      <>
        <div className="modal-wrapper"></div>
        <div className="modal">
        <IconContext.Provider
        value={{
            size: '2em',
            className: 'modal-close'
        }}
        >
            <AiFillCloseCircle onClick={handleModal} />
        </IconContext.Provider>
          <div className="modal-inner"><p>{workOut}</p>
          </div>
        </div>
      </>,

      document.body
    ) : null}
    </>
  )
  
}
