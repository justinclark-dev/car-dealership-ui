import "./Car.css";
import { fetchCarById } from "../../Services/api";
import { useState } from "react";
import { useEffect } from "react";

const Car = (props) => {

  // const {carId} = props;
  const carId = 3;

  const [carValues, setCarValues] = useState({
    id: 0,
    make: '',
    model: '',
    year: 0,
    trim: '',
    color: '',
    price_listed: 0.00,
    milage: 0,
    sale_pending: 'f',
    sold: 'f',
    days_on_lot: 0,
    buyer: '',
    price_sold: 0.00,
  });

  // Init Fetching
  useEffect(() => {

    // Fetches data for the car
    const fetchCarData = async () => {
      try {
        const carData = await fetchCarById(carId);
        console.log(carData);
        setCarValues(carData);
      } catch (error) {
        console.error("Failed to fetch car data:", error);
      }
    }

    fetchCarData()
  }, [])

  return (
    <>
      <button onClick={()=> navigate('/car/update')}></button>
      <p>ID: {carValues.id}</p>
      <p>Make: {carValues.make}</p>
      <p>Model: {carValues.model}</p>
      <p>Year: {carValues.year}</p>
      <p>Trim: {carValues.trim}</p>
      <p>Color: {carValues.color}</p>
      <p>Price Listed: {carValues.price_listed}</p>
      <p>Milage: {carValues.milage}</p>
      <p>Sale Pending: {carValues.sale_pending}</p>
      <p>Sold: {carValues.sold}</p>
      <p>Days on Lot: {carValues.days_on_lot}</p>
      <p>Buyer: {carValues.buyer}</p>
      <p>Price Sold: {carValues.price_sold}</p>
    </>
  )
};

export default Car;