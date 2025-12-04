import CarCards from "../Components/CarCards.Jsx";

function Inventory({ cars }) {
  return (
    <main className="inventory-page">
      <h2>Inventory</h2>
      <CarCards cars={cars} />
    </main>
  );
}

export default Inventory;
