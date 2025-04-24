import React, { useState, useEffect } from "react";
import "./App.css";
import UserCard from "./components/UserCard";
import FooterMenu from "./components/FooterMenu";

const App = () => {
  const [users, setUsers] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("inicio");

  // Función para generar usuarios aleatorios
  const generateUsers = () => {
    setLoading(true);
    fetch("https://randomuser.me/api/?results=20") // Obtenemos 20 usuarios
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.results); // Almacenamos los usuarios generados
        setFilteredUsers(data.results); // Filtramos por defecto
        setLoading(false); // Dejamos de mostrar el estado de carga
      })
      .catch((error) => {
        console.error("Error al generar usuarios:", error);
        setLoading(false); // Si hay error, dejamos de mostrar el estado de carga
      });
  };

  // Filtrar usuarios por nombre o correo electrónico
  useEffect(() => {
    if (search) {
      const filtered = users.filter(
        (user) =>
          user.name.first.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredUsers(filtered); // Aplicamos el filtro
    } else {
      setFilteredUsers(users); // Si no hay búsqueda, mostramos todos los usuarios
    }
  }, [search, users]);

  // Agregar o quitar de favoritos
  const toggleFavorite = (user) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.email === user.email)) {
        return prevFavorites.filter((fav) => fav.email !== user.email); // Eliminar favorito
      }
      return [...prevFavorites, user]; // Agregar a favoritos
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
        <button onClick={generateUsers} className="generate-btn">
          Generar Usuarios
        </button>
      </div>

      {/* Mostrar contenido según la pestaña activa */}
      <div className="content">
        {activeTab === "inicio" && <p>Bienvenido a la aplicación</p>}
        {activeTab === "lista" && (
          <div className="user-list">
            {loading ? (
              <p>Cargando usuarios...</p>
            ) : (
              filteredUsers.map((user) => (
                <UserCard
                  key={user.email}
                  user={user}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              ))
            )}
          </div>
        )}
        {activeTab === "filtro" && <p>Filtrar resultados...</p>}
        {activeTab === "buscar" && <p>Buscador de usuarios...</p>}
        {activeTab === "favoritos" && (
          <div className="user-list">
            {favorites.length === 0 ? (
              <p>No tienes favoritos.</p>
            ) : (
              favorites.map((user) => (
                <UserCard
                  key={user.email}
                  user={user}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              ))
            )}
          </div>
        )}
        {activeTab === "configuracion" && <p>Configuración de la aplicación</p>}
      </div>

      {/* Menú Inferior */}
      <FooterMenu activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
