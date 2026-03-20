import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Layout from './components/Layout'; 
import Home from './pages/Home';         
import Zarada from './pages/Zarada';
import Garaza from './pages/Garaza';
import Popravke from './pages/Popravke';

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Layout /> {/* Ovo se sada prikazuje na svakoj stranici */}
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/zarada" element={<Zarada />} />
          <Route path="/garaza" element={<Garaza />} />
          <Route path="/popravke" element={<Popravke />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;