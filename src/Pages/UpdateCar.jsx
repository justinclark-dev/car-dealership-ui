import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCarById, updateCar } from '../Services/api.js';

export default function UpdateCar() {
  const { carId } = useParams();
  const [form, setForm] = useState(null); 
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // 1. Fetch and Populate Data
  useEffect(() => {
    const fetchAndPopulateCar = async () => {
      setError('');
      setMessage('');
      
      try {
        if (!carId) {
            setError("Error: No car ID provided for update in the URL.");
            setForm({}); 
            return;
        }
        
        const carData = await fetchCarById(carId);

        // Convert data types from Django model to form-friendly strings/booleans
        setForm({
          make: carData.make ?? '',
          model: carData.model ?? '',
          year: carData.year?.toString() ?? '',
          trim: carData.trim ?? '',
          color: carData.color ?? '',
          price_listed: carData.price_listed?.toString() ?? '',
          milage: carData.milage?.toString() ?? '',
          days_on_lot: carData.days_on_lot?.toString() ?? '',
          buyer: carData.buyer ?? '',
          price_sold: carData.price_sold?.toString() ?? '',
          sale_pending: carData.sale_pending ?? false,
          image_url: carData.image_url ?? '',
          sold: carData.sold ?? false,
        });

      } catch (err) {
        // Stop the loading screen by setting form to an empty object
        setForm({}); 
        setError(`Failed to fetch car data: ${err.message}`);
      }
    };

    fetchAndPopulateCar();
  }, [carId]);

  // Handle form changes
  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // 2. Update operation
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage('');
    setError('');

    // Normalize values (strings back to Numbers or null/Decimal) for the API payload
    const payload = {
      ...form,
      year: form.year ? Number(form.year) : null,
      price_listed: form.price_listed || null,
      milage: form.milage ? Number(form.milage) : null,
      days_on_lot: form.days_on_lot ? Number(form.days_on_lot) : null,
      price_sold: form.price_sold || null,
      buyer: form.buyer || null,
      image_url: form.image_url || null
    };

    try {
      await updateCar(carId, payload);
      setMessage('Car updated successfully!');
    } catch (err) {
      setError(`Failed to update car: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  // 3. Conditional Rendering (Handling Loading and Errors)
  
  if (form === null) {
    return <section className="update-car"><h2>Loading Car Details...</h2></section>;
  }
  if (Object.keys(form).length === 0 && error) {
     return <section className="update-car"><p className="error">Error: {error}</p></section>;
  }
  
  return (
    <section className="update-car">
      <h2>Update Car Details (ID: {carId})</h2>
      <p>Edit the details below to update the car in inventory.</p>

      <form onSubmit={handleSubmit} className="update-car__form">
        <div className="grid">
          <label>
            Make*
            <input
              name="make"
              value={form.make}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Model*
            <input
              name="model"
              value={form.model}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Year*
            <input
              type="number"
              name="year"
              value={form.year}
              onChange={handleChange}
              required
              min="1886"
            />
          </label>

          <label>
            Trim
            <input
              name="trim"
              value={form.trim}
              onChange={handleChange}
            />
          </label>
          <label>
            Image URL
            <input
              name="image_url"
              value={form.image_url}
              onChange={handleChange}
            />
          </label>
          <label>
            Color
            <input
              name="color"
              value={form.color}
              onChange={handleChange}
            />
          </label>

          <label>
            Listed Price
            <input
              type="number"
              step="0.01"
              name="price_listed"
              value={form.price_listed}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Mileage
            <input
              type="number"
              name="milage"
              value={form.milage}
              onChange={handleChange}
            />
          </label>

          <label>
            Days on lot
            <input
              type="number"
              name="days_on_lot"
              value={form.days_on_lot}
              onChange={handleChange}
            />
          </label>

          <label>
            Buyer
            <input
              name="buyer"
              value={form.buyer}
              onChange={handleChange}
            />
          </label>

          <label>
            Sold price
            <input
              type="number"
              step="0.01"
              name="price_sold"
              value={form.price_sold}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="checkboxes">
          <label>
            <input
              type="checkbox"
              name="sale_pending"
              checked={form.sale_pending}
              onChange={handleChange}
            />
            Sale pending
          </label>

          <label>
            <input
              type="checkbox"
              name="sold"
              checked={form.sold}
              onChange={handleChange}
            />
            Sold
          </label>
        </div>

        {error && <p className="error">Error: {error}</p>}
        {message && <p className="success">{message}</p>}

        <button type="submit" disabled={submitting}>
          {submitting ? 'Updating…' : 'Update Car'}
        </button>
      </form>
    </section>
  );
}