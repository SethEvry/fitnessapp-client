import { createContext, useState, useEffect, useCallback } from "react";

export const CalendarContext = createContext();

const CalendarContextProvider = ({ children }) => {
  //Actual Current Day
  const today = new Date();

  //Current Date Selected
  const [currentDate, setCurrentDate] = useState(today);

  //monthly calendar array
  const [calendar, setCalendar] = useState([]);

  //weekly calendar array
  const [weeklyCalendar, setWeeklyCalendar] = useState([]);

  //Functions

  /**
   * Generates a month of dates completing weeks before and after month
   *
   */
  const generateCalendar = useCallback(() => {
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    const day = [firstDay.getDay(), lastDay.getDay()];
    setCalendar([]);
    let cal = []
    for (let i = -day[0] + 1; i < lastDay.getDate() + (7 - day[1]); i++) {
      let newDate = new Date(firstDay);
        newDate.setDate(i);
        cal.push(newDate)
        //setCalendar((oldCalendar) => [...oldCalendar, newDate]);
      }
      let newCal = []
      while(cal.length > 0) {
        newCal.push(cal.splice(0,7));
      }
      setCalendar(newCal)
  }, [currentDate, setCalendar]);

  /**
   * generates a week of dates based on the current Date
   */
  const generateWeeklyCalendar = useCallback(() => {
    const day = currentDate.getDay();
    const date = currentDate.getDate();
    setWeeklyCalendar([]);
    for (let i = -day; i < 7 - day; i++) {
      let newDate = new Date(currentDate);
      newDate.setDate(date + i);
      setWeeklyCalendar((oldWeeklyCalendar) => [...oldWeeklyCalendar, newDate]);
    }
  }, [currentDate, setWeeklyCalendar]);

  /**
   * Puts currentDate a week forwards or back
   */
  const handleWeekChange = (option) => {
    const change = option === "LEFT" ? -1 : 1;
    const date = currentDate.getDate();
    const newDate = new Date(currentDate);
    newDate.setDate(date + 7 * change);
    setCurrentDate(newDate);
  };

  // Initial calendar generation

  useEffect(() => {
    generateCalendar();
    generateWeeklyCalendar();
  }, [generateCalendar, generateWeeklyCalendar]);

  return (
    <CalendarContext.Provider
      value={{
        today,
        currentDate,
        setCurrentDate,
        calendar,
        generateCalendar,
        weeklyCalendar,
        generateWeeklyCalendar,
        handleWeekChange,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarContextProvider;
