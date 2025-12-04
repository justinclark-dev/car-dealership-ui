import { BrowserRouter } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Router from './Components/Router.jsx'
import './App.css' 
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
export default App;
