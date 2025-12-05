import {Routes, Route} from "react-router-dom";
import Inventory from "../Pages/Inventory.jsx";
import Car from "../Pages/Car/Car.jsx";
import AddCar from "../Pages/AddCar.jsx";
import UpdateCar from "../Pages/UpdateCar.jsx";   

const Router = () => {

return (
    <Routes>

       <Route index element={<Inventory />} />
       <Route path="/car/add" element={<AddCar />} />
       <Route path="/car/:id" element={<Car />} />
       <Route path="/update-car/:carId" element={<UpdateCar />} />
    
    </Routes>
)
}

export default Router;