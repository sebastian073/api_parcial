import React from "react";

const UserCard = ({ user, favorites, toggleFavorite }) => {
  const isFavorite = favorites.some((fav) => fav.email === user.email);

  return (
    <div className="user-card">
      <img src={user.picture.medium} alt={user.name.first} />
      <h2>{user.name.first} {user.name.last}</h2>
      <p>{user.email}</p>
      <button
        className={`favorite-btn ${isFavorite ? "active" : ""}`}
        onClick={() => toggleFavorite(user)}
      >
        {isFavorite ? "Eliminar de favoritos" : "Agregar a favoritos"}
      </button>
    </div>
  );
};

export default UserCard;
