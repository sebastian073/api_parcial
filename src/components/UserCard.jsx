import React from "react";

const UserCard = ({ user, toggleFavorite, favorites }) => {
  const isFavorite = favorites.some((fav) => fav.email === user.email);

  return (
    <div className="user-card">
      <img src={user.picture.medium} alt={user.name.first} />
      <h2>{user.name.first} {user.name.last}</h2>
      <p>{user.email}</p>
      <button
        onClick={() => toggleFavorite(user)}
        className={isFavorite ? "favorite active" : "favorite"}
      >
        {isFavorite ? "Eliminar de favoritos" : "Agregar a favoritos"}
      </button>
    </div>
  );
};

export default UserCard;
