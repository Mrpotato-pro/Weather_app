import { useState } from "react";

type SearchBarProps = {
  city: string;
  setCity: (city: string) => void;
  onSearch: () => Promise<void>;
  loading: boolean;
};

export default function SearchBar({ city, setCity, onSearch, loading }: SearchBarProps) {
  const [error, setError] = useState<string>("");

  const handleSearch = async () => {
    if (!city.trim()) {
      setError("City name cannot be empty");
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(city.trim())) {
      setError("Please enter a valid city name");
      return;
    }

    try {
      setError("");
      await onSearch();
    } catch {
      setError("City not found. Please try again.");
    }
  };

  return (
    <div className="search-bar-wrapper">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="search-btn" onClick={handleSearch} disabled={loading}>
          <span className="gradient"></span>
          <span className="label">{loading ? "Loading..." : "Search"}</span>
          <span className="transition"></span>
        </button>
      </div>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}
