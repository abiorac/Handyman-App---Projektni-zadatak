import React, { createContext, useState, useContext, useEffect } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [vozila, setVozila] = useState([]);
  const [popravke, setPopravke] = useState([]);

  useEffect(() => {
    if (user && user.id) osveziPodatke();
  }, [user]);

  const osveziPodatke = async () => {
    if (!user || !user.id) return;
    try {
      const resVozila = await fetch(`http://localhost:5000/api/vozila/${user.id}`);
      const dataVozila = await resVozila.json();
      setVozila(dataVozila);

      const resPopravke = await fetch(`http://localhost:5000/api/popravke/${user.id}`);
      const dataPopravke = await resPopravke.json();
      setPopravke(dataPopravke);
    } catch (err) { console.error(err); }
  };

  // DODATA FUNKCIJA ZA LOGOUT
  const logout = () => {
    setUser(null);
    setVozila([]);
    setPopravke([]);
  };

  const dodajVozilo = async (v) => {
    await fetch('http://localhost:5000/api/vozila', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        ...v, 
        user_id: user.id,
        cena_goriva: v.cenaGoriva 
      })
    });
    osveziPodatke();
  };

  const obrisiVozilo = async (id) => {
    await fetch(`http://localhost:5000/api/vozila/${id}`, { method: 'DELETE' });
    osveziPodatke();
  };

  const dodajPopravku = async (p) => {
    await fetch('http://localhost:5000/api/popravke', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...p, user_id: user.id, dodatni_trosak: p.dodatniTrosak })
    });
    osveziPodatke();
  };

  return (
    <DataContext.Provider value={{ 
      user, setUser, vozila, dodajVozilo, obrisiVozilo, 
      popravke, dodajPopravku, logout // IZVEZENO OVDE
    }}>
      {children}
    </DataContext.Provider>
  );
};
export const useData = () => useContext(DataContext);