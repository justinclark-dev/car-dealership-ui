const API_URL = 'http://localhost:8000/api';

export const fetchCars = async () => {
    const response = await fetch(`${API_URL}/cars`);
    const data = await response.json();
    return data;
};

export const fetchCarById = async (id) => {
    const response = await fetch(`${API_URL}/cars/${id}`);
    const data = await response.json();
    return data;
};

export const createCar = async (carData) => {
    const response = await fetch(`${API_URL}/cars`, {
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
    const response = await fetch(`${API_URL}/cars/${id}`, {
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
    const response = await fetch(`${API_URL}/cars/${id}`, {
        method: 'DELETE',
    });
    return response.ok;
}

// ======================================
// Adding local Storage: React alone cannot keep track of the changes 
// necessary to track "favorites" updates. Currently, the favorites will 
// be lost when the page is refreshed. localStorage saves data in the browser 
// and will survive a refresh. React displays favorites while localStorage remembers favorites. 


export function getFavorites() {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [] 
    // ternary function: if something is stored, 
    // convert from string to array else: return empty array.
    // converts the newly created
    // JSON into a usable array with .parse it converts it back to JS object.

    // reads favorites list from localStorage and turns it into the usable array
}

export function addFavorite(car) {
    const favorites = getFavorites();

    const exists = favorites.some((fav) => String(fav.id) === String(car.id));
    if (exists) return; // ??

    const updated = [...favorites, car];
    localStorage.setItem("favorites", JSON.stringify(updated));
    // need to turn the selected favorites selection into a string 
    // because localStorage can only take in strings. 

    // Takes the car object and moves it to the favorites list in localStorage
}

export function removeFavorite(id) {
    const favorites = getFavorites();
    const updated = favorites.filter((car) => String(car.id) !== String(id));
    
    localStorage.setItem("favorites", JSON.stringify(updated));

    //Remove one car from the favorites using its id.
}