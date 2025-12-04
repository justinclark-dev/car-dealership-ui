// API helper for the Django backend. Uses Vite env so the base URL can be configured.
const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/$/, '');

async function handleResponse(res) {
  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.detail || 'Request failed');
  }
  return res.json();
}

export const fetchCars = async () => {
  const res = await fetch(`${API_BASE}/api/cars`);
  return handleResponse(res);
};

export const fetchCarById = async (id) => {
  const res = await fetch(`${API_BASE}/api/cars/${id}`);
  return handleResponse(res);
};

export const createCar = async (carData) => {
  const res = await fetch(`${API_BASE}/api/cars`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(carData),
  });
  return handleResponse(res);
};

export const updateCar = async (id, carData) => {
  const res = await fetch(`${API_BASE}/api/cars/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(carData),
  });
  return handleResponse(res);
};

export const deleteCar = async (id) => {
  const res = await fetch(`${API_BASE}/api/cars/${id}`, { method: 'DELETE' });
  if (res.status === 204) return true; // DRF returns 204 on delete.
  await handleResponse(res);
  return true;
};
