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
};

export const createCar = async (carData) => {
    const response = await fetch(`${API_URL}/cars/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData),
    });
    const data = await response.json();
    return data;
}

export const updateCar = async (id, carData) => {
    const response = await fetch(`${API_URL}/cars/${id}/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData),
    });
    const data = await response.json();
    return data;
}

export const deleteCar = async (id) => {
    const response = await fetch(`${API_URL}/cars/${id}/delete`, {
        method: 'DELETE',
    });
    return response.ok;
}