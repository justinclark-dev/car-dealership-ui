import "./Car.css";
import { fetchCarById } from "../../Services/api.js";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Simple detail view for a single car.
const Car = () => {
  const { id } = useParams();
  const [carValues, setCarValues] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    const fetchCarData = async () => {
      try {
        const carData = await fetchCarById(id);
        setCarValues(carData);
      } catch (err) {
        setError(err.message || "Failed to fetch car data");
      }
    };

    fetchCarData();
  }, [id]);

  if (error) return <p className="error">Error: {error}</p>;
  if (!carValues) return <p>Loading car…</p>;

  return (
    <section className="car-detail">
      <h1>{carValues.make} {carValues.model}</h1>
      <p>ID: {carValues.id}</p>
      <p>Year: {carValues.year}</p>
      <p>Trim: {carValues.trim}</p>
      <p>Color: {carValues.color}</p>
      <p>Price Listed: {carValues.price_listed}</p>
      <p>Milage: {carValues.milage}</p>
      <p>Sale Pending: {String(carValues.sale_pending)}</p>
      <p>Sold: {String(carValues.sold)}</p>
      <p>Days on Lot: {carValues.days_on_lot}</p>
      <p>Buyer: {carValues.buyer || '—'}</p>
      <p>Price Sold: {carValues.price_sold}</p>
    </section>
  );
};

export default Car;
