import React, { useState, useEffect,useRef } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import CountdownTimer from './component/CountdownTimer';
import {Canvas, useFrame} from "@react-three/fiber"
import { useSpring, animated } from "@react-spring/three";
import './App.css';

const eventDate = new Date('2023-05-04T11:41:00'); // Change this to your event date

const Home = () => (
  <div>
    <h2>Welcome to the Home Page</h2>
  </div>
);

const Count = () => (
  <div>
    <h1>Event Countdown</h1>
    <CountdownTimer eventDate={eventDate} format="DD:MM:YY" />
    <CountdownTimer eventDate={eventDate} format="DD:Min:Sec" />
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
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
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
    axios
      .get('https://rickandmortyapi.com/api/character')
      .then((response) => setApiData(response.data.results))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h2>API Data</h2>
      <ul>
        {apiData.map((character) => (
          <li key={character.id}>{character.name}</li>
        ))}
      </ul>
    </div>
  );
};

function Cube(props) {
  // Use useRef hook to access the mesh element
  const mesh = useRef();

  // State values for hover and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  //Basic animation to rotate our cube using animation frame
  useFrame(() => (mesh.current.rotation.x += 0.01));

  //Spring animation hook that scales size based on active state
  const { scale } = useSpring({ scale: active ? 1.5 : 1 });

  // Jsx to render our 3d cube. Our cube will have height
  // width and depth equal 2 units.
  // You also need a material so that you can add color
  // and show shadows. We are using the standard
  // material <<meshStandardMaterial />

  return (
    <animated.mesh
      ref={mesh}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
      onClick={(event) => setActive(!active)}
      scale={scale}
    >
      <boxGeometry args={[5, 5, 2]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </animated.mesh>
  );
}
const App = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress((loadingProgress) => loadingProgress + 5);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="app-container">
    {loadingProgress < 100 ? (
      <div className="progress-container">
        <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Cube />
    </Canvas>
        <div className="progress-text">{loadingProgress}%</div>
      </div>
    ) : (
        <BrowserRouter>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/weekdays">Week Days</Link>
                </li>
                <li>
                  <Link to="/months" >Months</Link></li>
            <li>
              <Link to="/apidata">API Data</Link>
            </li>
            <li>
              <Link to="/count">Count</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/weekdays" element={<WeekDays />} />
          <Route path="/months" element={<Months />} />
          <Route path="/apidata" element={<ApiData />} />
          <Route path="/count" element={<Count />} />
        </Routes>
      </div>
    </BrowserRouter>
  )}
  </div>
);
};

export default App;
