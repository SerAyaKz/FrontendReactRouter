import axios from 'axios';

export const fetchData = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
  return response.data.slice(0, 12);
};