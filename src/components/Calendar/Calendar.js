import { useCallback, useContext, useEffect, useState } from "react";
import { uid } from "uid";

// style
import "./calendar.css";

//Component
import { Modal } from "..";

//Context
import { CalendarContext } from "../../context/CalendarContext";
import { ModalContext } from "../../context/ModalContext";

const Calendar = () => {
  //Calendar Context
  const {
    currentDate,
    setCurrentDate,
    calendar,
    today,
    handleMonthChange,
    handleYearChange,
  } = useContext(CalendarContext);

  //Modal Reducer
  const { dispatch } = useContext(ModalContext);

  const [blocks, setBlocks] = useState([]);

  const [month, setMonth] = useState(
    currentDate.toLocaleDateString("en-US", { month: "long" })
  );
  const [year, setYear] = useState(currentDate.getFullYear());

  //year array for select
  const years = () => {
    const cYear = today.getFullYear();
    let years = [];
    for (let i = -10; i < 1; i++) {
      years = [...years, cYear + i];
    }
    return years;
  };
  //for bar above
  const weekdays = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  //Sets Current Date to the clicked then closes modal
  const handleClick = useCallback(
    (date) => {
      setCurrentDate(date);
      dispatch({ type: "CLOSE" });
    },
    [setCurrentDate, dispatch]
  );

  /**
   * creates a 2 dimension array of <divs> for the calendar
   */
  const generateBlocks = useCallback(() => {
    if (calendar) {
      let blockz = [];

      // makes a 2-dimensional array for the calendar
      calendar.forEach((week) => {
        const block = (
          <div className="calendar_week" key={uid()}>
            {week.map((date) => {
              //options for toLocaleDateString
              const locale = "en-US";
              const options = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              };

              // creates class for before and after dates
              const classOption1 =
                date.getMonth() !== currentDate.getMonth()
                  ? "extra_block "
                  : "";

              //creates class for the actual day
              const classOption2 =
                date.toLocaleDateString(locale, options) ===
                today.toLocaleDateString(locale, options)
                  ? " current_date "
                  : "";
              return (
                <div
                  key={uid()}
                  onClick={() => handleClick(date)}
                  className={`calendar_block ${classOption1} ${classOption2}`}
                >
                  <p>{date.getDate()}</p>
                </div>
              );
            })}
          </div>
        );
        blockz.push(block);
      });
      setBlocks(blockz);
    } else {
      setBlocks([<p>Loading...</p>]);
    }
  }, [setBlocks, calendar, currentDate, today, handleClick]);

  //generates calendar on render
  useEffect(() => {
    generateBlocks();
  }, [generateBlocks]);

  return (
    <Modal>
      {/* Make sure blocks exist before it tries to render -- woo async */}
      {blocks.length ? (
        <div className="calendar_grid">
          <div className="calendar_header">
            <select
              defaultValue={month}
              onChange={(e) => {
                setMonth(e.target.value);
                handleMonthChange(e.target.value);
              }}
            >
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
            <select
              defaultValue={year}
              onChange={(e) => {
                setYear(e.target.value);
                handleYearChange(e.target.value);
              }}
            >
              {years().map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="calendar_weekdays">
            {weekdays.map((weekday) => (
              <p key={uid()}>{weekday}</p>
            ))}
          </div>
          <div className="calendar_main">{blocks.map((block) => block)}</div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Modal>
  );
};

export default Calendar;
