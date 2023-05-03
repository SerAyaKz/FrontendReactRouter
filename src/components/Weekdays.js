import { useState } from 'react';

function Weekdays() {
  const [weekday, setWeekday] = useState('Monday');

  const handleChange = (e) => {
    setWeekday(e.target.value);
  };

  return (
    <div>
      <h1>Choose a weekday:</h1>
      <select value={weekday} onChange={handleChange}>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
        <option value="Sunday">Sunday</option>
      </select>
      <p>You selected: {weekday}</p>
    </div>
  );
}

export default Weekdays;
