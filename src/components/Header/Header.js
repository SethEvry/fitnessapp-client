import "./header.css";

//react-icons
import { ImArrowLeft, ImArrowRight } from "react-icons/im";
import { AiOutlineCalendar } from "react-icons/ai"
import { IconContext } from "react-icons/lib";
import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import { CalendarContext } from "../../context/CalendarContext";


export default function Header() {

  const {dispatch} = useContext(ModalContext)
  const { handleWeekChange } = useContext(CalendarContext);

  return (
    <div className="header">
      <IconContext.Provider value={{className: 'header_left', size: '1.5em'}}>
        <ImArrowLeft onClick={() => handleWeekChange('LEFT')}/>
      </IconContext.Provider>
      
      <h3 className="header_title">
      <IconContext.Provider value={{className: "header_calendar"}}>
        <AiOutlineCalendar onClick={()=> dispatch({type: "CALENDAR"})}/>
      </IconContext.Provider>
      Seth's Week
      </h3>
      
      
      <IconContext.Provider value={{className: 'header_right', size: '1.5em'}}>
        <ImArrowRight onClick={() => handleWeekChange('RIGHT')} />
      </IconContext.Provider>
    </div>
  );
}
