import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import NavBar from './Components/NavBar';

function App() {
   return (
    <>
      <BrowserRouter>
        <div className='App'>
          <NavBar />
          <Router />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
