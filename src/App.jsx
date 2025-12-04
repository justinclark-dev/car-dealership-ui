import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import NavBar from './Components/NavBar';
import Inventory from './Pages/Inventory';
// import Router from './Components/Router.jsx'
import './App.css'
import CarCards from './Components/CarCards.Jsx';
import { useEffect, useState } from 'react' 
import { fetchCars } from './Services/api.js';

function App() {

   return (
    <>
      <BrowserRouter>
        <div className='App'>
          <NavBar />
            <Inventory cars={cars} />
            {/* <Router /> */}
        </div>
      </BrowserRouter>
    </>
  )
}
export default App;
