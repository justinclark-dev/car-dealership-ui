import { useState } from 'react'

// Simple add-car form placeholder so the UI renders while wiring up the API.
function AddCar() {
  const [form, setForm] = useState({
    make: '',
    model: '',
    year: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submit car', form) // replace with API call when ready
  }

  return (
    <section className="card">
      <h2>Add a car</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Make
          <input
            name="make"
            value={form.make}
            onChange={handleChange}
            placeholder="Honda"
            required
          />
        </label>
        <label>
          Model
          <input
            name="model"
            value={form.model}
            onChange={handleChange}
            placeholder="Civic"
            required
          />
        </label>
        <label>
          Year
          <input
            name="year"
            value={form.year}
            onChange={handleChange}
            placeholder="2020"
            required
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </section>
  )
}

export default AddCar
