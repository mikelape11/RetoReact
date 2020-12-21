import React from 'react';
import { Link } from "react-router-dom"
import logo from './logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" /> 
        <button className="boton"><Link to="/about">About</Link>BUENAS</button>
      </header>
    </div>
  );
}

export default App;
