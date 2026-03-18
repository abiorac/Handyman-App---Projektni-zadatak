import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Popravke from './pages/Popravke';
import Zarada from './pages/Zarada';
import Garaza from './pages/Garaza';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="popravke" element={<Popravke />} />
          <Route path="zarada" element={<Zarada />} />
          <Route path="garaza" element={<Garaza />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;