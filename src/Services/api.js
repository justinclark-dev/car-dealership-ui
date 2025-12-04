const API_URL = 'http://localhost:8000/api';

export const fetchCars = async () => {
    const response = await fetch(`${API_URL}/cars/`);
    const data = await response.json();
    return data;
};

export const fetchCarById = async (id) => {
    const response = await fetch(`${API_URL}/cars/${id}/`);
    const data = await response.json();
    return data;
}