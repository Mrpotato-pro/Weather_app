import { useState, useEffect } from "react";
import { getWeatherByCity, getWeatherByCoords } from "../api/weather";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import FavoritesList from "../components/FavoritesList";

export default function Dashboard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = async () => {
    if (!city) return;
    try {
      setLoading(true);
      const data = await getWeatherByCity(city);
      setWeather(data);
      setCity("");
    } finally {
      setLoading(false);
    }
  };

  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            setLoading(true);
            const data = await getWeatherByCoords(
              pos.coords.latitude,
              pos.coords.longitude
            );
            setWeather(data);
          } catch (err) {
            console.error("Error fetching weather:", err);
            alert("Could not fetch weather for your location.");
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Could not get your location. Please allow access or try again.");
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      alert("Geolocation not supported in your browser.");
    }
  };

  const handleAddFavorite = () => {
    if (weather?.location?.name && !favorites.includes(weather.location.name)) {
      setFavorites([...favorites, weather.location.name]);
    }
  };

  const handleRemoveFavorite = (cityToRemove: string) => {
    setFavorites(favorites.filter((f) => f !== cityToRemove));
  };

  const handleSelectFavorite = async (favCity: string) => {
    try {
      setLoading(true);
      const data = await getWeatherByCity(favCity);
      setWeather(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>🌤 Weather Dashboard</h1>

      <div style={{ marginBottom: "1rem" }}>
        <p style={{ fontSize: "1.25rem" }}>
          Check weather for your location or another city:
        </p>

        <button onClick={handleUseLocation} className="location-btn">
          <span>Use My Location</span>
        </button>

        <SearchBar
          city={city}
          setCity={setCity}
          onSearch={handleSearch}
          loading={loading}
        />
      </div>

      {weather && (
        <div>
          <h2 style={{ fontSize: "1.75rem" }}>
            Currently viewing: {weather.location.name},{" "}
            {weather.location.country}
          </h2>

          <WeatherCard
            data={weather}
            onAddFavorite={handleAddFavorite}
            favorites={favorites}
          />
        </div>
      )}

      <FavoritesList
        favorites={favorites}
        onSelect={handleSelectFavorite}
        onRemove={handleRemoveFavorite}
      />
    </div>
  );
}
