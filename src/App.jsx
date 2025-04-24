import React, { useState } from "react";
import "./App.css";
import { FaStar, FaRegStar } from "react-icons/fa";

function App() {
  const usersData = [
    // ... tu array de usuarios original ...
  ];

  const [users, setUsers] = useState(usersData);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [tab, setTab] = useState("all");

  const toggleFavorite = (email) => {
    setFavorites((prev) =>
      prev.includes(email) ? prev.filter((f) => f !== email) : [...prev, email]
    );
  };

  const filterByTab = () => {
    let list = users;

    switch (tab) {
      case "favorites":
        return list.filter((user) => favorites.includes(user.email));
      case "search":
        return list.filter((user) =>
          `${user.name.first} ${user.name.last}`.toLowerCase().includes(search.toLowerCase())
        );
      case "random":
        return [...list].sort(() => 0.5 - Math.random()).slice(0, 3);
      case "filter":
        return list; // Se organiza por categorías abajo
      default:
        return list;
    }
  };

  const displayedUsers = filterByTab();

  const getGenderCategory = () => {
    const males = users.filter((u) => u.picture.thumbnail.includes("/men/"));
    const females = users.filter((u) => u.picture.thumbnail.includes("/women/"));
    return { males, females };
  };

  const handleReset = () => {
    setSearch("");
    setTab("all");
    setUsers(usersData);
  };

  return (
    <div className="container">
      {tab === "search" && (
        <input
          type="text"
          placeholder="Buscar usuario..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
      )}

      {tab === "filter" && (
        <div className="filter-panel">
          <h3>Categoría: Hombres</h3>
          {getGenderCategory().males.map((user) => (
            <UserCard key={user.email} user={user} favorites={favorites} toggleFavorite={toggleFavorite} />
          ))}
          <h3>Categoría: Mujeres</h3>
          {getGenderCategory().females.map((user) => (
            <UserCard key={user.email} user={user} favorites={favorites} toggleFavorite={toggleFavorite} />
          ))}
        </div>
      )}

      {tab !== "filter" && (
        <div>
          {displayedUsers.map((user) => (
            <UserCard key={user.email} user={user} favorites={favorites} toggleFavorite={toggleFavorite} />
          ))}
        </div>
      )}

      <div className="bottom-menu">
        <button className={`tab-btn ${tab === "all" ? "active" : ""}`} onClick={() => setTab("all")}>Listar</button>
        <button className={`tab-btn ${tab === "filter" ? "active" : ""}`} onClick={() => setTab("filter")}>Categorías</button>
        <button className={`tab-btn ${tab === "search" ? "active" : ""}`} onClick={() => setTab("search")}>Buscador</button>
        <button className={`tab-btn ${tab === "favorites" ? "active" : ""}`} onClick={() => setTab("favorites")}>Favoritos</button>
        <button className={`tab-btn ${tab === "random" ? "active" : ""}`} onClick={() => setTab("random")}>Aleatorios</button>
        <button className="tab-btn" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

function UserCard({ user, favorites, toggleFavorite }) {
  return (
    <div className="card">
      <div className="card-header">
        <img src={user.picture.thumbnail} alt={user.name.first} />
        <div>
          <strong>{user.name.first} {user.name.last}</strong>
          <div>{user.email}</div>
        </div>
      </div>
      <button className="favorite-btn" onClick={() => toggleFavorite(user.email)}>
        {favorites.includes(user.email) ? <FaStar color="gold" size={20} /> : <FaRegStar size={20} />}
      </button>
    </div>
  );
}

export default App;
