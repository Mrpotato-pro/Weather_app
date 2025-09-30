import { useState } from "react";
import Lottie from "lottie-react";

// Import animations
import sunnyAnim from "../animations/sunny.json";
import cloudyAnim from "../animations/cloudy.json";
import mistAnim from "../animations/mist.json";
import rainAnim from "../animations/rain.json";
import snowAnim from "../animations/snow.json";
import stormAnim from "../animations/storm.json";
import windyAnim from "../animations/windy.json";

type WeatherCardProps = {
  data: any;
  onAddFavorite: () => void;
  favorites: string[];
};

function getWeatherBackground(condition: string, isDay: number): string {
  const c = condition.toLowerCase();

  // Nighttime background
  if (isDay === 0) {
    return "linear-gradient(135deg, #192644ff, #4e2e81ff)"; 
  }

  if (c.includes("sunny") || c.includes("clear")) {
    return "linear-gradient(135deg, #f5880bff, #dbd51dff)";
  }
  if (c.includes("cloud")) {
    return "linear-gradient(135deg, #6b7280, #9ca3af)";
  }
  if (c.includes("rain") || c.includes("drizzle")) {
    return "linear-gradient(135deg, #3b82f6, #1e3a8a)";
  }
  if (c.includes("snow") || c.includes("ice")) {
    return "linear-gradient(135deg, #e0f2fe, #60a5fa)";
  }
  if (c.includes("thunder") || c.includes("storm")) {
    return "linear-gradient(135deg, #4b5563, #1f2937)";
  }
  if (c.includes("fog") || c.includes("mist")) {
    return "linear-gradient(135deg, #94a3b8, #cbd5e1)";
  }

  return "linear-gradient(135deg, #1e3a8a, #0d9488)";
}

function getWeatherAnimation(condition: string) {
  const c = condition.toLowerCase();

  if (c.includes("sunny") || c.includes("clear")) return sunnyAnim;
  if (c.includes("cloud")) return cloudyAnim;
  if (c.includes("mist") || c.includes("fog")) return mistAnim;
  if (c.includes("rain") || c.includes("drizzle")) return rainAnim;
  if (c.includes("snow") || c.includes("ice")) return snowAnim;
  if (c.includes("thunder") || c.includes("storm")) return stormAnim;
  if (c.includes("wind")) return windyAnim;

  return sunnyAnim; 
}

export default function WeatherCard({ data, onAddFavorite, favorites }: WeatherCardProps) {
  const [unit, setUnit] = useState<"C" | "F">("C");

  if (!data) return null;

  const { location, current } = data;
  const cityName = location.name;

  const temp = unit === "C" ? current.temp_c : current.temp_f;
  const feelsLike = unit === "C" ? current.feelslike_c : current.feelslike_f;

  const isFavorite = favorites.includes(cityName);
  const cardBackground = getWeatherBackground(current.condition.text, current.is_day);
  const animationData = getWeatherAnimation(current.condition.text);

  return (
    <div className="weather-card" style={{ background: cardBackground }}>
      <div className="weather-card-header">
        <h2>{cityName}, {location.country}</h2>

        {!isFavorite && (
          <button className="search-btn" onClick={onAddFavorite}>
            <span className="gradient"></span>
            <span className="label">⭐</span>
            <span className="transition"></span>
          </button>
        )}
      </div>

      <p><em>{location.region}</em></p>
      <p><strong>Local time:</strong> {location.localtime}</p>

      <Lottie 
        animationData={animationData}
        loop={true}
        speed={current.condition.text.toLowerCase().includes("sunny") ? 0.25 : 1}
        style={{ width: 160, height: 160, margin: "0 auto" }}
      />

      <h3>{current.condition.text}</h3>

      <div style={{ marginBottom: "1rem" }}>
        <button
          className={unit === "C" ? "temp-btn-c temp-active" : "temp-btn-c temp-c-inactive"}
          onClick={() => setUnit("C")}
        >
          °C
        </button>
        <button
          className={unit === "F" ? "temp-btn-f temp-active" : "temp-btn-f temp-f-inactive"}
          onClick={() => setUnit("F")}
        >
          °F
        </button>
      </div>

      {/* Stats split into two columns */}
      <div className="weather-stats">
        <ul>
          <li><strong>Temperature:</strong> {temp}°{unit}</li>
          <li><strong>Feels like:</strong> {feelsLike}°{unit}</li>
          <li><strong>Humidity:</strong> {current.humidity}%</li>
          <li><strong>Cloud cover:</strong> {current.cloud}%</li>
        </ul>
        <ul>
          <li><strong>Wind:</strong> {current.wind_kph} kph ({current.wind_dir})</li>
          <li><strong>Pressure:</strong> {current.pressure_mb} mb</li>
          <li><strong>Visibility:</strong> {current.vis_km} km</li>
          <li><strong>UV Index:</strong> {current.uv}</li>
        </ul>
      </div>
    </div>
  );
}
