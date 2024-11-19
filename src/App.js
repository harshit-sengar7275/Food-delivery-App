/* eslint-disable react/jsx-no-undef */
import * as React from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router // Use BrowserRouter
} from "react-router-dom";
import './App.css'; // Custom CSS file
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './Screens/Home';
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import { CartProvider } from "./Components/ConRed";
import MyOrder from "./Screens/MyOrder";


function App() {
  return (
    <CartProvider>
    <Router>
      <div className="bg-dark text-light min-vh-100"> {/* Bootstrap dark background */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/createuser" element={<Signup />} />
          <Route exact path="//myorder" element={<MyOrder/>}/>
        </Routes>
      </div>
    </Router>
    </CartProvider>
  
  );
}

export default App;
