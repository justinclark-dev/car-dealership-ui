import CarCards from "../Components/CarCards.Jsx";

function Inventory({ cars }) {

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
    <main className="inventory-page">
      <h2>Inventory</h2>
      <CarCards cars={cars} />
    </main>
  );
}

export default Inventory;
