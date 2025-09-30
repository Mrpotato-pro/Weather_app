import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const API_KEY = process.env.WEATHER_API_KEY;

router.get("/", async (req, res) => {
  try {
    const { city, lat, lon } = req.query;

    if (!city && (!lat || !lon)) {
      return res.status(400).json({ error: "Provide either ?city=London or ?lat=51.5&lon=-0.12" });
    }

    let query = "";

    if (city) {
      query = city as string; 
    } else if (lat && lon) {
      query = `${lat},${lon}`; 
    }

    const response = await axios.get("https://api.weatherapi.com/v1/current.json", {
      params: {
        key: API_KEY,
        q: query,
        aqi: "no",
      },
    });

    res.json(response.data);
  } catch (err: any) {
    if (err.response) {
      console.error("WeatherAPI error:", err.response.data);
      return res.status(err.response.status).json(err.response.data);
    }
    res.status(500).json({ error: err.message });
  }
});

export default router;
