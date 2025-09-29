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

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Search for a city
  const handleSearch = async () => {
    if (!city) return;
    try {
      setLoading(true);
      const data = await getWeatherByCity(city);
      setWeather(data);
      setCity(""); // clear input after search
    } finally {
      setLoading(false);
    }
  };

  // Use geolocation
  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          setLoading(true);
          const data = await getWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
          setWeather(data);
        } finally {
          setLoading(false);
        }
      });
    } else {
      alert("Geolocation not supported in your browser.");
    }
  };

  // Add current city to favorites
  const handleAddFavorite = () => {
    if (weather?.location?.name && !favorites.includes(weather.location.name)) {
      setFavorites([...favorites, weather.location.name]);
    }
  };

  // Remove a city from favorites
  const handleRemoveFavorite = (cityToRemove: string) => {
    setFavorites(favorites.filter((f) => f !== cityToRemove));
  };

  // Select a favorite city
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

      {/* Always show search options */}
      <div style={{ marginBottom: "1rem" }}>
        <p>Check weather for your location or another city:</p>
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
    <h2>
      Currently viewing: {weather.location.name}, {weather.location.country}
    </h2>
    <WeatherCard 
    data={weather} 
    onAddFavorite={handleAddFavorite}
    favorites={favorites} 
  />
</div>
)}


      {/* Favorites list */}
      <FavoritesList
        favorites={favorites}
        onSelect={handleSelectFavorite}
        onRemove={handleRemoveFavorite}
      />
    </div>
  );
}
