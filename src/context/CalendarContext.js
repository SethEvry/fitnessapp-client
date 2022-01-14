import { createContext, useState, useEffect, useCallback } from "react";

export const CalendarContext = createContext();

const CalendarContextProvider = ({ children }) => {
  //Actual Current Day
  const today = new Date();

  //Current Date Selected
  const [currentDate, setCurrentDate] = useState(today);

  //First Day of Month - date object
  const [firstDay, setFirstDay] = useState(
    new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  );

  //Last Day of Month
  const [lastDay, setLastDay] = useState(
    new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
  );

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
    const day = [firstDay.getDay(), lastDay.getDay()];
    for (let i = -day[0] + 1; i < lastDay.getDate() + (7 - day[1]); i++) {
      let newDate = new Date(firstDay);
      newDate.setDate(i);
      setCalendar((oldCalendar) => [...oldCalendar, newDate]);
    }
  }, [firstDay, lastDay, setCalendar]);

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
  }

  // Initial calendar generation

  useEffect(() => {
    generateCalendar();
  }, [generateCalendar]);

  useEffect(() => {
    generateWeeklyCalendar();
  }, [generateWeeklyCalendar]);

  return (
    <CalendarContext.Provider
      value={{
        currentDate,
        calendar,
        generateCalendar,
        weeklyCalendar,
        generateWeeklyCalendar,
        handleWeekChange
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarContextProvider;
