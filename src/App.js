import React, { useState, useEffect } from 'react';
import {  BrowserRouter,  Routes,   Route,Link} from "react-router-dom";
import axios from 'axios';

const Home = () => (
  <div>
    <h2>Welcome to the Home Page</h2>
  </div>
);

const WeekDays = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [currentDay, setCurrentDay] = useState(days[0]);

  return (
    <div>
      <h2>Week Days</h2>
      <p>Current Day: {currentDay}</p>
      <button onClick={() => setCurrentDay(days[(days.indexOf(currentDay) + 1) % days.length])}>
        Next Day
      </button>
    </div>
  );
};

const Months = () => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [currentMonth, setCurrentMonth] = useState(months[0]);

  return (
    <div>
      <h2>Months</h2>
      <p>Current Month: {currentMonth}</p>
      <button onClick={() => setCurrentMonth(months[(months.indexOf(currentMonth) + 1) % months.length])}>
        Next Month
      </button>
    </div>
  );
};

const ApiData = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character')
      .then(response => setApiData(response.data.results))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>API Data</h2>
      <ul>
        {apiData.map(character => (
          <li key={character.id}>{character.name}</li>
        ))}
      </ul>
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/weekdays">Week Days</Link></li>
          <li><Link to="/months">Months</Link></li>
          <li><Link to="/apidata">API Data</Link></li>
        </ul>
      </nav>
      <Routes>
      <Route path="/" exact element={<Home />}></Route>
      <Route path="/weekdays" element={<WeekDays />}></Route>
      <Route path="/months" element={<Months />}></Route>
      <Route path="/apidata" element={<ApiData />}></Route>

       
  </Routes>
</div>
</BrowserRouter>
);
export default App;
