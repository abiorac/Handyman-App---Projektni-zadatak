import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // 1. Korisnik - null znači da niko nije ulogovan
  const [user, setUser] = useState(null);

  // 2. Lista vozila - postavljena na prazan niz
  const [vozila, setVozila] = useState([]);

  // 3. Lista popravki za stranicu Zarada
  const [popravke, setPopravke] = useState([]);

  // Funkcija za LOGOUT
  const logout = () => {
    setUser(null);
  };

  // Funkcija za dodavanje novog vozila
  const dodajVozilo = (novo) => {
    setVozila((prevVozila) => [...prevVozila, { ...novo, id: Date.now() }]);
  };

  // Funkcija za BRISANJE vozila
  const obrisiVozilo = (id) => {
    setVozila((prevVozila) => prevVozila.filter(v => v.id !== id));
  };

  // Funkcija za dodavanje popravke
  const dodajPopravku = (nova) => {
    setPopravke((prevPopravke) => [nova, ...prevPopravke]);
  };

  return (
    <DataContext.Provider value={{ 
      user,
      setUser,
      logout,
      vozila, 
      dodajVozilo, 
      obrisiVozilo, 
      popravke, 
      dodajPopravku 
    }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook za lakše korišćenje podataka
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData mora biti korišćen unutar DataProvider-a");
  }
  return context;
};