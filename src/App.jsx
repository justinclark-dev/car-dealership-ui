import { BrowserRouter } from 'react-router-dom'
import NavBar from './Components/NavBar';
import CarCards from './Components/CarCards.Jsx';
import './App.css'
import { useEffect, useState } from 'react' 
import { fetchCars } from './Services/api.js';

function App() {

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    async function loadCars() {
      try {
        const data = await fetchCars();
        setCars(data);

      } catch (err) {
        setError(err.message);

      } finally {
        setLoading(false);
      }
    }

    loadCars(); 
  }, []); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

   return (
    <>
      <BrowserRouter>
        <div className='App'>
          <NavBar />
            <CarCards cars={cars} />
        </div>
      </BrowserRouter>
    </>
  )
}


export default App;
