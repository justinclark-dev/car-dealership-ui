import { getFavorites, removeFavorite } from "../Services/api";
import { useEffect, useState } from "react"
import './Favorites.css'
import { Link } from 'react-router-dom';


function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const initialFavorites = getFavorites();
    setFavorites(initialFavorites);
  }, []);
  // gets the information from favorites as soon as the page loads. 

  const handleRemove = (id) => {
    removeFavorite(id);
    setFavorites((prev) => prev.filter((car) => car.id !== id));
  };


  if (favorites.length === 0) {
    return <h2>No cars have been added to favorites yet.</h2>;
  }
    //using the new favorites array. referencing to populate the front end 
    // of the page. The Favorites array is acting as the localStorage piece
  return (
    <main className="inventory-page">
      <h2>Favorites</h2>
      <ul className="favorites-list">
        {favorites.map((car) => (
          <li key={car.id} className="favorite-item">
            <Link to={`/car/${car.id}`} className="favorite-link">
              <span>
                {car.year} {car.make} {car.model}
              </span>
            </Link>
            <button className="remove button" onClick={() => handleRemove(car.id)}>
              Remove from Favorites
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Favorites;
