import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Weather from "./components/Weather";
import Learning from "./components/Learning";
import Products from "./components/Products";
import Market from "./components/Market";
import About from "./components/About";
import QRScanner from "./components/QRScanner";
import QRGenerator from "./components/QRGenerator";
import Developer from "./components/Developer";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/qr-scan" element={<QRScanner />} />
           <Route path="/qr-gen" element={<QRGenerator />} />
          <Route path="/market" element={<Market />} />
          <Route path="/products" element={<Products />} /> 
          <Route path="/about" element={<About />} />
          <Route path="/developer" element={<Developer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;