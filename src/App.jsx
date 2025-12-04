import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
// import NavBar from './Components/NavBar.jsx';
import Router from './Services/Router.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <NavBar /> */}
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
