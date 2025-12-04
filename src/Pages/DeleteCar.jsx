import { useState } from 'react';
import { deleteCar } from '../Services/api.js';

// Simple delete screen to remove a car by ID.
export default function DeleteCar() {
  const [carId, setCarId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    const parsedId = Number(carId);
    if (!parsedId) {
      setError('Enter a valid numeric car ID.');
      return;
    }

    setSubmitting(true);
    try {
      await deleteCar(parsedId);
      setMessage(`Car ${parsedId} deleted.`);
      setCarId('');
    } catch (err) {
      setError(err.message || 'Delete failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="add-car">
      <header>
        <h1>Delete a Car</h1>
        <p>Remove a listing from the inventory by ID.</p>
      </header>

      <form onSubmit={handleSubmit} className="add-car__form">
        <div className="grid">
          <label>
            Car ID*
            <input
              type="number"
              name="carId"
              value={carId}
              onChange={(e) => setCarId(e.target.value)}
              placeholder="e.g. 1"
              required
              min="1"
            />
          </label>
        </div>

        {error && <p className="error">Error: {error}</p>}
        {message && <p className="success">{message}</p>}

        <div className="actions">
          <button type="submit" disabled={submitting}>
            {submitting ? 'Deleting…' : 'Delete Car'}
          </button>
        </div>
      </form>
    </section>
  );
}
