import './CarCards.css';

function CarCards({ cars }) {

  return (
    <ul className="car-list">
      {cars.map((car) => (
        <li className="car-card" key={car.id}>
          <h3 className="car-title">
            <span className="car-label">Make:</span> {car.make}
          </h3>
          <p>
            <span className="car-label">Model:</span> {car.model}
          </p>
          <p>
            <span className="car-label">Year:</span> {car.year}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default CarCards;