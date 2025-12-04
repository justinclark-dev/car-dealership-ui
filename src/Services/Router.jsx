import { Routes, Route } from "react-router-dom";
import Inventory from "../Pages/Inventory.jsx";
import AddCar from "../Pages/AddCar.jsx";
import DeleteCar from "../Pages/DeleteCar.jsx";
import Car from "../Pages/Car/Car.jsx";

const Router = () => {
  return (
    <Routes>
      <Route index element={<Inventory />} />
      <Route path="/cars/add" element={<AddCar />} />
      <Route path="/cars/delete" element={<DeleteCar />} />
      <Route path="/car/:id" element={<Car />} />
    </Routes>
  );
};

export default Router;
