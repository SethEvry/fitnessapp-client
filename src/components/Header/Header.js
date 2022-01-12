import "./header.css";

//react-icons
import { ImArrowLeft, ImArrowRight } from "react-icons/im";
import { IconContext } from "react-icons/lib";

export default function Header() {
  return (
    <div className="header">
      <IconContext.Provider value={{className: 'header_left', size: '1.5em'}}>
        <ImArrowLeft />
      </IconContext.Provider>
      <h3 className="header_title">Seth's Week</h3>
      <IconContext.Provider value={{className: 'header_right', size: '1.5em'}}>
        <ImArrowRight />
      </IconContext.Provider>
    </div>
  );
}
