import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL;

// Fetch by city
export const getWeatherByCity = async (city: string) => {
  const res = await axios.get(`${baseUrl}`, { params: { city } });
  return res.data;
};

// Fetch by coordinates
export const getWeatherByCoords = async (lat: number, lon: number) => {
  const res = await axios.get(`${baseUrl}`, { params: { lat, lon } });
  return res.data;
};
