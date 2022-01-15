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
            {weeklyCalendar.map(day => <Column day={day} />)}
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
