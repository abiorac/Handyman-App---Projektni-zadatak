import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Popravke from './pages/Popravke';
import Garaza from './pages/Garaza';
import Zarada from './pages/Zarada';
import Login from './pages/Login';
import Register from './pages/Register';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <DataProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/popravke" element={<Popravke />} />
          <Route path="/garaza" element={<Garaza />} />
          <Route path="/zarada" element={<Zarada />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;