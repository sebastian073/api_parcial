import React, { useState, useEffect } from "react";
import "./App.css";
import UserCard from "./components/UserCard";
import FooterMenu from "./components/FooterMenu";

const App = () => {
  const [users, setUsers] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener usuarios aleatorios de la API
  useEffect(() => {
    fetch("https://randomuser.me/api/?results=20")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.results);
        setFilteredUsers(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los usuarios:", error);
        setLoading(false);
      });
  }, []);

  // Filtrar usuarios por nombre o correo electrónico
  useEffect(() => {
    if (search) {
      const filtered = users.filter(
        (user) =>
          user.name.first.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [search, users]);

  // Agregar o quitar de favoritos
  const toggleFavorite = (user) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.email === user.email)) {
        return prevFavorites.filter((fav) => fav.email !== user.email);
      }
      return [...prevFavorites, user];
    });
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Generador de Usuarios Aleatorios</h1>
        <input
          type="text"
          placeholder="Buscar usuario..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <div className="user-list">
          {filteredUsers.map((user) => (
            <UserCard
              key={user.email}
              user={user}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}

      {/* Menú Inferior */}
      <FooterMenu />
    </div>
  );
};

export default App;
