const api = import.meta.env.VITE_API_URL
export const endpoints = {
  acceso: `${api}/auth`,
  login: `${api}/auth/login`,
  register: `${api}/auth/register`,
  getUser: `${api}/users/profile`,
  patchUser: `${api}/users/`,
  paquetes: `${api}/packages`,
  vehiculos: `${api}/vehicles`,
  visitas: `${api}/visits`,
  nuevos: `${api}/news`
}
