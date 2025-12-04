import { useState } from 'react';
import { createCar } from '../Services/cars';

// Baseline state so we can quickly clear the form after a save.
const initialForm = {
  make: '',
  model: '',
  year: '',
  trim: '',
  color: '',
  price_listed: '',
  milage: '',
  sale_pending: false,
  sold: false,
  days_on_lot: '',
  buyer: '',
  price_sold: '',
};

export default function AddCar() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setMessage('');
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage('');
    setError('');

    // Normalize values to match the API model types.
    const payload = {
      ...form,
      year: form.year ? Number(form.year) : null,
      price_listed: form.price_listed || null,
      milage: form.milage ? Number(form.milage) : null,
      days_on_lot: form.days_on_lot ? Number(form.days_on_lot) : null,
      price_sold: form.price_sold || null,
      buyer: form.buyer || null,
    };

    try {
      await createCar(payload);
      setForm(initialForm);
      setMessage('Car added successfully');
    } catch (err) {
      setError(err.message || 'Unable to save car right now.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="add-car">
      <header>
        <h1>Add a Car</h1>
        <p>Enter listing details to add the car to dealership inventory.</p>
      </header>

      <form onSubmit={handleSubmit} className="add-car__form">
        <div className="grid">
          <label>
            Make*
            <input
              name="make"
              value={form.make}
              onChange={handleChange}
              required
              placeholder="Honda"
            />
          </label>

          <label>
            Model*
            <input
              name="model"
              value={form.model}
              onChange={handleChange}
              required
              placeholder="Civic"
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
              placeholder="2020"
            />
          </label>

          <label>
            Trim
            <input
              name="trim"
              value={form.trim}
              onChange={handleChange}
              placeholder="EX / Sport / Touring"
            />
          </label>

          <label>
            Color
            <input
              name="color"
              value={form.color}
              onChange={handleChange}
              placeholder="Blue"
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
              placeholder="22000"
            />
          </label>

          <label>
            Mileage
            <input
              type="number"
              name="milage"
              value={form.milage}
              onChange={handleChange}
              placeholder="54000"
            />
          </label>

          <label>
            Days on lot
            <input
              type="number"
              name="days_on_lot"
              value={form.days_on_lot}
              onChange={handleChange}
              placeholder="0"
            />
          </label>

          <label>
            Buyer
            <input
              name="buyer"
              value={form.buyer}
              onChange={handleChange}
              placeholder="(optional)"
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
              placeholder="(if sold)"
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
        {message && <p className="success">Success: {message}</p>}

        <div className="actions">
          <button type="submit" disabled={submitting}>
            {submitting ? 'Saving…' : 'Add Car'}
          </button>
          <button
            type="button"
            className="secondary"
            onClick={resetForm}
            disabled={submitting}
          >
            Clear
          </button>
        </div>
      </form>
    </section>
  );
}
