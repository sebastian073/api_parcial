import React from "react";

const FooterMenu = ({ activeTab, setActiveTab }) => {
  return (
    <div className="footer">
      <ul>
        <li
          className={activeTab === "inicio" ? "active" : ""}
          onClick={() => setActiveTab("inicio")}
        >
          Inicio
        </li>
        <li
          className={activeTab === "lista" ? "active" : ""}
          onClick={() => setActiveTab("lista")}
        >
          Usuarios
        </li>
        <li
          className={activeTab === "filtro" ? "active" : ""}
          onClick={() => setActiveTab("filtro")}
        >
          Filtrar
        </li>
        <li
          className={activeTab === "buscar" ? "active" : ""}
          onClick={() => setActiveTab("buscar")}
        >
          Buscar
        </li>
        <li
          className={activeTab === "favoritos" ? "active" : ""}
          onClick={() => setActiveTab("favoritos")}
        >
          Favoritos
        </li>
        <li
          className={activeTab === "configuracion" ? "active" : ""}
          onClick={() => setActiveTab("configuracion")}
        >
          Configuración
        </li>
      </ul>
    </div>
  );
};

export default FooterMenu;
