import ReactDOM from "react-dom";

import './modal.css'

//react-icons
import { IconContext } from "react-icons/lib";
import { AiFillCloseCircle } from "react-icons/ai";



export default function Modal({children, handleModal}) {
  return ReactDOM.createPortal(
    <>
      <div className="modal-wrapper"></div>
      <div className="modal">
        <IconContext.Provider
          value={{
            size: "2em",
            className: "modal-close",
          }}
        >
          <AiFillCloseCircle onClick={handleModal} />
        </IconContext.Provider>
        <div className="modal-inner">
          {children}
        </div>
      </div>
    </>,

    document.body
  );
}
