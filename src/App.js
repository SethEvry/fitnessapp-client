import { useContext } from "react";
import "./app.css";

//components
import { Header, Column, Footer, AddWorkout, Calendar } from "./components";
import { CalendarContext } from "./context/CalendarContext";
import { ModalContext } from "./context/ModalContext";

function App() {
  const { state } = useContext(ModalContext);
  const { weeklyCalendar } = useContext(CalendarContext);

  return (
    <div className="App">
      <div className="container">
        {weeklyCalendar.length === 7 ? (
          <>
            <Header />
            <Column day={weeklyCalendar[0]} />
            <Column day={weeklyCalendar[1]} />
            <Column day={weeklyCalendar[2]} />
            <Column day={weeklyCalendar[3]} />
            <Column day={weeklyCalendar[4]} />
            <Column day={weeklyCalendar[5]} />
            <Column day={weeklyCalendar[6]} />
            <Footer />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {state.addingWorkOut ? <AddWorkout date={state.date} /> : null}
      {state.isCalendar ? <Calendar /> : null}
    </div>
  );
}

export default App;
