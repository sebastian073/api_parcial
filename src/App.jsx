import React, { useState } from "react";
import "./App.css";
import { FaStar, FaRegStar } from "react-icons/fa";
import Register from './components/Register';
import Login from './components/Login';
import Notes from './components/Notes';

const App = () => {
  const usersData = [
    {
      name: { first: "John", last: "Doe" },
      email: "johndoe@example.com",
      gender: "male",
      picture: { thumbnail: "https://randomuser.me/api/portraits/thumb/men/1.jpg" }
    },
    {
      name: { first: "Jane", last: "Smith" },
      email: "janesmith@example.com",
      gender: "female",
      picture: { thumbnail: "https://randomuser.me/api/portraits/thumb/women/2.jpg" }
    },
    {
      name: { first: "Mike", last: "Johnson" },
      email: "mikejohnson@example.com",
      gender: "male",
      picture: { thumbnail: "https://randomuser.me/api/portraits/thumb/men/3.jpg" }
    },
    {
      name: { first: "Emily", last: "Brown" },
      email: "emilybrown@example.com",
      gender: "female",
      picture: { thumbnail: "https://randomuser.me/api/portraits/thumb/women/4.jpg" }
    },
    // Nuevos usuarios agregados:
    {
      name: { first: "Carlos", last: "Lopez" },
      email: "carloslopez@example.com",
      gender: "male",
      picture: { thumbnail: "https://randomuser.me/api/portraits/thumb/men/5.jpg" }
    },
    {
      name: { first: "Laura", last: "Gomez" },
      email: "lauragomez@example.com",
      gender: "female",
      picture: { thumbnail: "https://randomuser.me/api/portraits/thumb/women/6.jpg" }
    },
    {
      name: { first: "David", last: "Martinez" },
      email: "davidmartinez@example.com",
      gender: "male",
      picture: { thumbnail: "https://randomuser.me/api/portraits/thumb/men/7.jpg" }
    },
    {
      name: { first: "Ana", last: "Rodriguez" },
      email: "anarodriguez@example.com",
      gender: "female",
      picture: { thumbnail: "https://randomuser.me/api/portraits/thumb/women/8.jpg" }
    }
  ];

  const [users, setUsers] = useState(usersData);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [tab, setTab] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all"); // nuevo estado para género

  const toggleFavorite = (email) => {
    setFavorites((prev) =>
      prev.includes(email) ? prev.filter((f) => f !== email) : [...prev, email]
    );
  };

  const filterByTab = () => {
    let list = users;

    if (tab === "favorites") {
      list = list.filter((user) => favorites.includes(user.email));
    }

    if (tab === "search") {
      list = list.filter((user) =>
        `${user.name.first} ${user.name.last}`.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filtro por género en todos los casos, excepto si es "all"
    if (genderFilter !== "all") {
      list = list.filter(user => user.gender === genderFilter);
    }

    return list;
  };

  const displayedUsers = filterByTab();

  return (
    <div className="app">
      <header className="header">
        <h1>Gestión de Usuarios</h1>
      </header>

      {/* Sección Registro */}
      <section className="section">
        <h2>Registro</h2>
        <Register />
      </section>

      {/* Sección Login */}
      <section className="section">
        <h2>Login</h2>
        <Login />
      </section>

      {/* Sección Notas */}
      <section className="section">
        <h2>Notas Personales</h2>
        <Notes />
      </section>

      {/* Filtro de género */}
      <div style={{ margin: "1rem 0" }}>
        <label htmlFor="genderFilter">Filtrar por género: </label>
        <select
          id="genderFilter"
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
        >
          <option value="all">Todos</option>
          <option value="male">Hombres</option>
          <option value="female">Mujeres</option>
        </select>
      </div>

      {/* Buscador solo si tab es search */}
      {tab === "search" && (
        <input
          type="text"
          placeholder="Buscar usuario..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
      )}

      {/* Lista de usuarios */}
      <div className="user-list">
        {displayedUsers.length === 0 ? (
          <div>No se encontraron usuarios</div>
        ) : (
          displayedUsers.map((user) => (
            <div key={user.email} className="card">
              <div className="card-header">
                <img src={user.picture.thumbnail} alt={user.name.first} className="user-img" />
                <div className="user-info">
                  <strong>{user.name.first} {user.name.last}</strong>
                  <div>{user.email}</div>
                </div>
              </div>
              <button className="favorite-btn" onClick={() => toggleFavorite(user.email)}>
                {favorites.includes(user.email) ? (
                  <FaStar color="gold" size={20} />
                ) : (
                  <FaRegStar size={20} />
                )}
              </button>
            </div>
          ))
        )}
      </div>

      {/* Menú Inferior */}
      <div className="bottom-menu">
        <button className={`tab-btn ${tab === "all" ? "active" : ""}`} onClick={() => setTab("all")}>
          Listar
        </button>
        <button className={`tab-btn ${tab === "filter" ? "active" : ""}`} onClick={() => setTab("filter")}>
          Filtro
        </button>
        <button className={`tab-btn ${tab === "search" ? "active" : ""}`} onClick={() => setTab("search")}>
          Buscador
        </button>
        <button className={`tab-btn ${tab === "favorites" ? "active" : ""}`} onClick={() => setTab("favorites")}>
          Favoritos
        </button>
      </div>
    </div>
  );
};

export default App;
