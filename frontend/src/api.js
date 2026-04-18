export async function fetchApi(endpoint, options = {}) {
  const url = `/api${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);

    // Si es 204 No Content
    if (response.status === 204) return null;

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Ocurrió un error en la petición');
    }

    return data;
  } catch (error) {
    if (error instanceof SyntaxError) {
       throw new Error('Error de conexión o respuesta inválida');
    }
    throw error;
  }
}
