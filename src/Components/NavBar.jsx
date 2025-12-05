import './NavBar.css';
import { Link } from 'react-router-dom' 

const NavBar = () => {
  return (
    <nav>
      <ul className="nav-list">
        <li><Link to="/">Inventory</Link></li>
        <li><Link to="/favorites">Favorites</Link></li>
        <li><Link to="/car/add">Add Car</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
