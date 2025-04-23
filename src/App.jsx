import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener usuarios aleatorios al cargar el componente
  useEffect(() => {
    axios.get('https://randomuser.me/api/?results=20') // Obtener 20 usuarios
      .then(response => {
        setUsers(response.data.results);
        setFilteredUsers(response.data.results);
        setLoading(false);
      })
      .catch(error => {
        console.error("Hubo un error al obtener los usuarios:", error);
        setLoading(false);
      });
  }, []);

  // Filtrar usuarios por nombre o correo electrónico
  useEffect(() => {
    if (search) {
      const filtered = users.filter(user =>
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
    setFavorites(prevFavorites => {
      if (prevFavorites.some(fav => fav.email === user.email)) {
        return prevFavorites.filter(fav => fav.email !== user.email);
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
          {filteredUsers.map(user => (
            <div key={user.email} className="user-card">
              <img src={user.picture.medium} alt={user.name.first} />
              <h2>{user.name.first} {user.name.last}</h2>
              <p>{user.email}</p>
              <button
                className={`favorite-btn ${favorites.some(fav => fav.email === user.email) ? 'active' : ''}`}
                onClick={() => toggleFavorite(user)}
              >
                {favorites.some(fav => fav.email === user.email) ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Menú Inferior */}
      <div className="footer">
        <ul>
          <li>Inicio</li>
          <li>Lista</li>
          <li>Filtro</li>
          <li>Buscar</li>
          <li>Favoritos</li>
          <li>Configuración</li>
        </ul>
      </div>
    </div>
  );
};

export default App;
