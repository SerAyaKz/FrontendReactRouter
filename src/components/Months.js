import { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchData } from '../data/api';

function Months() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [months, setMonths] = useState([]);

  useEffect(() => {
    const fetchMonths = async () => {
      try {
        const data = await fetchData();
        setMonths(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchMonths();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <div>
      <h1>List of months:</h1>
      <ul>
    {months.map((month) => (
      <li key={month.id}>{month.name}</li>
    ))}
  </ul>
</div>
);
}
export default Months;
