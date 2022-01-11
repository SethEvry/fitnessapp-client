import './app.css';

//components
import {Header, Column, Footer} from './components'

function App() {
  let week = [];
  for(let i = 0; i < 7; i++) {
      const today = new Date();
      const day = today.getDay();
      let iDate = new Date(today);
      iDate.setDate(iDate.getDate() - day + i);
      week.push(iDate);
  }

  return (
    <div className="App">
      <div className="container">
        <Header />
        <Column day={week[0]} />
        <Column day={week[1]} />
        <Column day={week[2]} />
        <Column day={week[3]} />
        <Column day={week[4]} />
        <Column day={week[5]} />
        <Column day={week[6]} />
        <Footer />
      </div>
    </div>
  );
}

export default App;
