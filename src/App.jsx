import React, { useState, useEffect } from "react";
import "./App.css";
import { Star, StarOff } from "lucide-react";

function App() {
  // Datos simulados de usuarios
  const usersData = [
    {
      name: { first: "John", last: "Doe" },
      email: "johndoe@example.com",
      picture: { thumbnail: "https://randomuser.me/api/portraits/thumb/men/1.jpg" }
    },
    {
      name: { first: "Jane", last: "Smith" },
      email: "janesmith@example.com",
      picture: { thumbnail: "https://randomuser.me/api/portraits/thumb/women/2.jpg" }
    },
    {
      name: { first: "Mike", last: "Johnson" },
      email: "mikejohnson@example.com",
      picture: { thumbnail: "https://randomuser.me/api/portraits/thumb/men/3.jpg" }
    },
    {
      name: { first: "Emily", last: "Brown" },
      email: "emilybrown@example.com",
      picture: { thumbnail: "https://randomuser.me/api/portraits/thumb/women/4.jpg" }
    },
    {
      name: { first: "Chris", last: "Davis" },
      email: "chrisdavis@example.com",
      picture: { thumbnail: "https://randomuser.me/api/portraits/thumb/men/5.jpg" }
    },
    // Agrega más usuarios aquí...
  ];

  // Estados
  const [users, setUsers] = useState(usersData);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [tab, setTab] = useState("all");

  // Función para agregar o quitar de favoritos
  const toggleFavorite = (email) => {
    setFavorites((prev) =>
      prev.includes(email) ? prev.filter((f) => f !== email) : [...prev, email]
    );
  };

  // Filtrar usuarios por tab y búsqueda
  const filterByTab = () => {
    let list = users;
    switch (tab) {
      case "favorites":
        list = list.filter((user) => favorites.includes(user.email));
        break;
      default:
        break;
    }
    return list.filter((user) => user.name.first.toLowerCase().includes(search.toLowerCase()));
  };

  // Obtener los usuarios que cumplen con el filtro
  const displayedUsers = filterByTab();

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Buscar usuario..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <div className="tabs">
        <button
          className={`tab-btn ${tab === "all" ? "active" : ""}`}
          onClick={() => setTab("all")}
        >
          Todos
        </button>
        <button
          className={`tab-btn ${tab === "favorites" ? "active" : ""}`}
          onClick={() => setTab("favorites")}
        >
          Favoritos
        </button>
      </div>

      <div>
        {displayedUsers.map((user) => (
          <div key={user.email} className="card">
            <div className="card-header">
              <img src={user.picture.thumbnail} alt={user.name.first} />
              <div>
                <div>
                  <strong>{user.name.first} {user.name.last}</strong>
                </div>
                <div>{user.email}</div>
              </div>
            </div>
            <button className="favorite-btn" onClick={() => toggleFavorite(user.email)}>
              {favorites.includes(user.email) ? (
                <Star color="gold" size={20} />
              ) : (
                <StarOff size={20} />
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="bottom-menu">
        <button
          className={tab === "all" ? "tab-btn active" : "tab-btn"}
          onClick={() => setTab("all")}
        >
          Todos
        </button>
        <button
          className={tab === "favorites" ? "tab-btn active" : "tab-btn"}
          onClick={() => setTab("favorites")}
        >
          Favoritos
        </button>
      </div>
    </div>
  );
}

export default App;
