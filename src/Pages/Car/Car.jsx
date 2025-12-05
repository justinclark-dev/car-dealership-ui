import "./Car.css";
import { fetchCarById } from "../../Services/api";
import { deleteCar } from "../../Services/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { addFavorite } from "../../Services/api"

const Car = () => {
  const { id } = useParams();
  const carId = Number(id); 
  // turns the params :id into integer

  const navigate = useNavigate();

  const [carValues, setCarValues] = useState({
    id: 0,
    make: "",
    model: "",
    year: 0,
    trim: "",
    color: "",
    price_listed: 0,
    milage: 0,
    sale_pending: "",
    sold: "",
    days_on_lot: 0,
    buyer: "",
    price_sold: 0,
  });

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const carData = await fetchCarById(carId);
        setCarValues(carData);
      } catch (error) {
        console.error("Failed to fetch car data:", error);
      }
    };

    if (!Number.isNaN(carId)) {
      fetchCarData();
    }
  }, [carId]);

    // Fetches data for the car
  const submitDeleteCar = async (carId) => {
    try {
      const response = await deleteCar(carId);
      console.log(response);
      navigate('/');
    } catch (error) {
      console.error("Failed to delete car:", error);
    }
  }

  const handleAddFavorite = () => {
    addFavorite(carValues);
    // passing carValues to addFavorite triggered from the button click.
    // stored inside localStorage as an array. 
    alert("Car added to Favorites")
  }
  const goToUpdateCar = () => {
    navigate(`/update-car/${carId}`);
  };

  return (
    <div className="car-page">
      
      <div className="car-top">
        {/* <div className="car-image-placeholder">
          
          <span>Car Image</span>
          
        </div> */}

        <div style={{ backgroundImage: `url(${carValues.image_url})` }} className='inventory-image'></div>

        <div className="car-summary">
          <div className="car-price-main">
            ${parseFloat(carValues.price_listed)
            .toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          }
          </div>
          <div className="car-summary-row">
            <strong>{carValues.year}</strong>
            <br />
            <strong>{carValues.make} {carValues.model}</strong>
          </div>
          <br />

          <button onClick={handleAddFavorite}>Add To Favorites</button>

          <button onClick={goToUpdateCar}>Update Car</button>
          <button className="delete-button" onClick={()=> submitDeleteCar(carId)}>Delete Car</button>
          

        </div>
      </div>

      {/* SPECS SECTION */}
      <div className="car-specs-card">
        <h2 className="car-specs-title">Vehicle</h2>
        <div className="car-specs-subtitle">Specifications</div>
        <div className="car-specs-divider" />

        <div className="car-specs-grid">
          <div className="spec-item">
            <span className="spec-label">Trim:</span>
            <span>{carValues.trim}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Color:</span>
            <span>{carValues.color}</span>
          </div>

          <div className="spec-item">
            <span className="spec-label">Mileage:</span>
            <span>{carValues.milage}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Sale Pending:</span>
            <span>{carValues.sale_pending ? 'Yes' : 'No'}</span>
          </div>

          <div className="spec-item">
            <span className="spec-label">Sold:</span>
            <span>{carValues.sold ? 'Yes' : 'No'}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Days on Lot:</span>
            <span>{carValues.days_on_lot}</span>
          </div>

          <div className="spec-item">
            <span className="spec-label">Buyer:</span>
            <span>{carValues.buyer ? carValues.buyer : "N/A" }</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Price Sold:</span>
            <span>
              {carValues.price_sold && carValues.price_sold !== 0
                ? `$${parseFloat(carValues.price_sold).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                : carValues.price_sold === 0
                ? "$0.00"
                : "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Car;