import {Routes, Route} from "react-router-dom";
import Inventory from "../Pages/Inventory.jsx";
import Car from "../Pages/Car/Car.jsx";


const Router = () => {

return (
    <Routes>

       <Route index element={<Inventory />} />
       <Route path="/car/:id" element={<Car />} />

    </Routes>
)
}

export default Router;