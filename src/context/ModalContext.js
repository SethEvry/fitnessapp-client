import { createContext, useReducer } from "react";

export const ModalContext = createContext();

const initialState = {
  isModal: false,
  addingWorkOut: false,
  isCalendar: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "VIEW":
      return { isModal: true, workOut: action.payload };

    case "CLOSE":
      return { isModal: false, addingWorkOut: false, isCalendar: false };

    case "ADDING":
      return { addingWorkOut: true, date: action.payload };

    case "CALENDAR":
      return { isCalendar: true };

    default:
      throw new Error('Wow oops');
  }
};

export const ModalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ModalContext.Provider value={{ state, dispatch }}>
      {children}
    </ModalContext.Provider>
  );
};
