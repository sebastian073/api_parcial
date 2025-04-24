import React, { useState, useEffect } from "react";
import "./App.css";
import FooterMenu from "./components/FooterMenu"; // Menú inferior

const App = () => {
  const [users, setUsers] = useState([]); // Para los usuarios generados
  const [favorites, setFavorites] = useState([]); // Para los usuarios favoritos
  const [search, setSearch] = useState(""); // Para el campo de búsqueda
  const [filteredUsers, setFilteredUsers] = useState([]); // Para filtrar los usuarios mostrados
  const [loading, setLoading] = useState(false); // Estado de carga
  const [activeTab, setActiveTab] = useState("inicio"); // Pestaña activa

  // Función para generar usuarios aleatorios
  const generateUsers = () => {
    setLoading(true); // Activamos el estado de carga
    fetch("https://randomuser.me/api/?results=10") // Solicitar 10 usuarios
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.results); // Guardamos los usuarios generados
        setFilteredUsers(data.results); // Mostramos todos inicialmente
        setLoading(false); // Desactivamos el estado de carga
      })
      .catch((error) => {
        console.error("Error al generar usuarios:", error);
        setLoading(false);
      });
  };

  // Filtrar los usuarios cuando hay búsqueda
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

  // Función para agregar o quitar usuarios de favoritos
  const toggleFavorite = (user) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.email === user.email)) {
        return prevFavorites.filter((fav) => fav.email !== user.email); // Eliminar si ya está en favoritos
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
          onChange={(e) => setSearch(e.target.value)} // Filtrar mientras se escribe
        />
        <button onClick={generateUsers} className="generate-btn">
          Generar Usuarios
        </button>
      </div>

      <div className="content">
        {/* Pestaña de inicio */}
        {activeTab === "inicio" && <p>Bienvenido a la aplicación</p>}

        {/* Pestaña de usuarios generados */}
        {activeTab === "lista" && (
          <div className="user-list">
            {loading ? (
              <p>Cargando usuarios...</p> // Mostrar estado de carga
            ) : (
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Agregar a Favoritos</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.email}>
                      <td>
                        <img src={user.picture.medium} alt={user.name.first} />
                      </td>
                      <td>{user.name.first} {user.name.last}</td>
                      <td>{user.email}</td>
                      <td>
                        <button
                          onClick={() => toggleFavorite(user)}
                          className={
                            favorites.some((fav) => fav.email === user.email)
                              ? "favorite-btn active"
                              : "favorite-btn"
                          }
                        >
                          {favorites.some((fav) => fav.email === user.email)
                            ? "Eliminar de favoritos"
                            : "Agregar a favoritos"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Pestaña de favoritos */}
        {activeTab === "favoritos" && (
          <div className="user-list">
            <h2>Usuarios Favoritos</h2>
            {favorites.length === 0 ? (
              <p>No tienes usuarios en favoritos.</p>
            ) : (
              <ul>
                {favorites.map((user) => (
                  <li key={user.email}>
                    <img src={user.picture.medium} alt={user.name.first} />
                    <span>{user.name.first} {user.name.last}</span>
                    <button
                      onClick={() => toggleFavorite(user)}
                      className="favorite-btn"
                    >
                      Eliminar de favoritos
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Otras pestañas */}
        {activeTab === "filtro" && <p>Filtrar resultados...</p>}
        {activeTab === "buscar" && <p>Buscador de usuarios...</p>}
        {activeTab === "configuracion" && <p>Configuración de la aplicación</p>}
      </div>

      {/* Menú Inferior */}
      <FooterMenu activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
