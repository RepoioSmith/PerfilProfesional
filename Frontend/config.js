// Configuración global para el Frontend
const API_BASE_URL = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost'
    ? 'http://127.0.0.1:5000/api'  // Desarrollo (Local)
    : 'https://tu-backend-en-produccion.com/api'; // Producción (Cuando lo subas)

export default API_BASE_URL;