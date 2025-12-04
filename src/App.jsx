import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import NavBar from './Components/NavBar.jsx';
import Router from './Services/Router.jsx';
import Footer from './Components/Footer.jsx';

function App() {
   return (
    <>
      <BrowserRouter>
        <div className='App'>
          <NavBar />
          <Router />
          {/* <h1>Hello World!</h1> */}
          <Footer />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
