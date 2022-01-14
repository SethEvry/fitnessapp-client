import { useContext } from "react";
import { Modal } from "..";
import "./calendar.css";
import { uid } from "uid";
import { CalendarContext } from "../../context/CalendarContext";

const Calendar = () => {
  const { currentDate, calendar } = useContext(CalendarContext);

  const month = currentDate.toLocaleDateString("en-US", { month: "long" });
  const year = currentDate.getFullYear();

  const generateBlocks = () => {
    if (calendar) {
      const blocks = calendar.map((date) => {
        return (
          <div
            key={uid()}
            className={
              `calendar_block` +
              `${
                date.getMonth() !== currentDate.getMonth()
                  ? " extra_block "
                  : ""
              }` +
              `${
                date.getDate() === currentDate.getDate() ? " current_date " : ""
              }`
            }
          >
            <p>{date.getDate()}</p>
          </div>
        );
      });
      return blocks;
    } else {
      return <p>Loading...</p>;
    }
  };

  return (
    <Modal>
      <div className="calendar_grid">
        <div className="calendar_header">
          <h2>
            {month} - {year}
          </h2>
        </div>
        <div className="calendar_main">{generateBlocks()}</div>
      </div>
    </Modal>
  );
};

export default Calendar;
