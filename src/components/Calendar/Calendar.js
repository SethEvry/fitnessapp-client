import { useCallback, useContext, useEffect, useState } from "react";
import { Modal } from "..";
import "./calendar.css";
import { uid } from "uid";
import { CalendarContext } from "../../context/CalendarContext";

const Calendar = () => {
  const { currentDate, setCurrentDate, calendar, today } = useContext(CalendarContext);

  const [blocks, setBlocks] = useState([]);


  const month = currentDate.toLocaleDateString("en-US", { month: "long" });
  const year = currentDate.getFullYear();

  const handleClick = useCallback((date) => {
    setCurrentDate(date);
  }, [setCurrentDate])

  const generateBlocks = useCallback(() => {
    if (calendar) {
      let blockz = [];
      calendar.forEach(week => {
        const block = (<div className="calendar_week" key={uid()} >{week.map(date => {
        const locale = 'en-US'
        const options = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        }
        return (
          <div
            key={uid()}
            onClick={() => handleClick(date)}
            className={
              `calendar_block` +
              `${
                date.getMonth() !== currentDate.getMonth()
                  ? " extra_block "
                  : ""
              }` +
              `${
                date.toLocaleDateString(locale, options) === today.toLocaleDateString(locale, options) ? " current_date " : ""
              }`
            }
          >
            <p>{date.getDate()}</p>
          </div>
        );
      })}</div>)
      blockz.push(block);
    })
      setBlocks(blockz);
    } else {
      setBlocks([<p>Loading...</p>])
    }
  }, [setBlocks, calendar, currentDate, today, handleClick]);

  useEffect(() => {
    generateBlocks();
  }, [generateBlocks]);

  return (
    <Modal>
      <div className="calendar_grid">
        <div className="calendar_header">
          <h2>
            {month} - {year}
          </h2>
        </div>
        <div className="calendar_main">{
          blocks.map((block) => block)
        }</div>
      </div>
    </Modal>
  );
};

export default Calendar;
