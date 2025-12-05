import './CarCards.css';
import { Link } from "react-router-dom";

function CarCards({ cars }) {

  return (
   <ul className="car-list">
  {cars.map((car) => (
    <Link to={`/car/${car.id}`} key={car.id} className="car-link">
      <li className="car-card">
        {/* <img src={car.image_url} alt="" /> */}
        <div style={{ backgroundImage: `url(${car.image_url})` }} className='inventory-image'></div>
        <h3 className="car-title">
          <span className="car-label"></span> {car.year} {car.make}
          <br></br>
          <span className="car-label"></span> {car.model}
        </h3>
        <p>
          <span className="car-price">${parseFloat(car.price_listed)
            .toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          }</span> 
        </p>

      </li>
    </Link>
  ))}
</ul>

  );
}

export default CarCards;