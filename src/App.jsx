// frontend/src/App.jsx
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [user, setUser] = useState(null); // Estado para almacenar el usuario generado

  // Función para obtener un usuario aleatorio desde la API backend
  const generateRandomUser = async () => {
    try {
      const response = await axios.get('http://localhost:5000/generate-user');
      setUser(response.data); // Guardar el usuario generado en el estado
    } catch (error) {
      console.error('Error al obtener el usuario', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Generador de Usuarios Aleatorios</h1>
      <button 
        onClick={generateRandomUser} 
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Generar Usuario Aleatorio
      </button>

      {/* Mostrar el usuario generado */}
      {user && (
        <div style={{ marginTop: '20px' }}>
          <h3>Nombre: {user.firstName} {user.lastName}</h3>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Teléfono:</strong> {user.phone}</p>
          <p><strong>Dirección:</strong> {user.address}</p>
        </div>
      )}
    </div>
  );
};

export default App;
