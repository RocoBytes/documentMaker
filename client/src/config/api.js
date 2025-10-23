/**
 * Configuración de la API
 * En desarrollo: usa el proxy de Vite (localhost:4000)
 * En producción: usa la URL configurada en VITE_API_ORIGIN
 */

const API_ORIGIN = import.meta.env.VITE_API_ORIGIN || '';

export const API_BASE_URL = API_ORIGIN;

/**
 * Helper para construir URLs de API
 */
export const getApiUrl = (path) => {
  // Asegurar que path comience con /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

export default { API_BASE_URL, getApiUrl };
