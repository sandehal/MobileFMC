import axios from 'axios';

const API_URL = 'https://your-server.com/api'; // Replace with your server URL

export const fetchFlightData = async () => {
  try {
    const response = await axios.get(`${API_URL}/flight-data`);
    return response.data;
  } catch (error) {
    console.error('Error fetching flight data:', error);
    throw error;
  }
};