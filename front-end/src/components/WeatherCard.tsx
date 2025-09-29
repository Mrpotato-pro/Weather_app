import { useState } from "react";

type WeatherCardProps = {
  data: any;
  onAddFavorite: () => void;
  favorites: string[];
};

export default function WeatherCard({ data, onAddFavorite, favorites }: WeatherCardProps) {
  const [unit, setUnit] = useState<"C" | "F">("C"); // default Celsius

  if (!data) return null;

  const { location, current } = data;
  const cityName = location.name;

  const temp = unit === "C" ? current.temp_c : current.temp_f;
  const feelsLike = unit === "C" ? current.feelslike_c : current.feelslike_f;

  const isFavorite = favorites.includes(cityName);

  return (
    <div className="weather-card">
      {/* City name + Favorite button */}
      <div className="weather-card-header">
        <h2>{cityName}, {location.country}</h2>

        {!isFavorite && (
          <button className="search-btn" onClick={onAddFavorite}>
            <span className="gradient"></span>
            <span className="label">⭐ Favorite</span>
            <span className="transition"></span>
          </button>
        )}
      </div>

      <p><em>{location.region}</em></p>
      <p><strong>Local time:</strong> {location.localtime}</p>

      <img src={current.condition.icon} alt="weather icon" />
      <h3>{current.condition.text}</h3>

      {/* Unit toggle buttons */}
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

      <ul>
        <li><strong>Temperature:</strong> {temp}°{unit}</li>
        <li><strong>Feels like:</strong> {feelsLike}°{unit}</li>
        <li><strong>Humidity:</strong> {current.humidity}%</li>
        <li><strong>Cloud cover:</strong> {current.cloud}%</li>
        <li><strong>Wind:</strong> {current.wind_kph} kph ({current.wind_dir})</li>
        <li><strong>Pressure:</strong> {current.pressure_mb} mb</li>
        <li><strong>Visibility:</strong> {current.vis_km} km</li>
        <li><strong>UV Index:</strong> {current.uv}</li>
      </ul>
    </div>
  );
}
