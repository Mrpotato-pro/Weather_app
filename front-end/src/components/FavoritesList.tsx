type FavoritesListProps = {
  favorites: string[];
  onSelect: (city: string) => void;
  onRemove: (city: string) => void;
};

export default function FavoritesList({ favorites, onSelect, onRemove }: FavoritesListProps) {
  if (!favorites.length) return null;

  return (
    <div className="favorites">
      <h3>⭐ Favorites</h3>
      <ul>
        {favorites.map((city) => (
          <li key={city}>
            <button onClick={() => onSelect(city)}>{city}</button>
            <button onClick={() => onRemove(city)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
