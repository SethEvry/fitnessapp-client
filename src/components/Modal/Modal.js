import ReactDOM from "react-dom";
import { useContext } from "react";
import './modal.css'

//react-icons
import { IconContext } from "react-icons/lib";
import { AiFillCloseCircle } from "react-icons/ai";

import { ModalContext } from "../../context/ModalContext";





export default function Modal({children}) {
  const {dispatch} = useContext(ModalContext);

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
          <AiFillCloseCircle onClick={() => dispatch({type: 'CLOSE'})} />
        </IconContext.Provider>
        <div className="modal-inner">
          {children}
        </div>
      </div>
    </>,

    document.body
  );
}
