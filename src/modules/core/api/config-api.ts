
import axios, {
  AxiosError,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
} from 'axios'

/**
 * Crea una instancia de Axios con una URL base.
 * La URL base se obtiene de una función de servicio.
 *
 * @constant {AxiosInstance}
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL ?? '',
  // timeout: 900000, // 900 segundos
})

api.defaults.timeout = 900000 // 900 segundos

/**
 * Actualiza los encabezados de la solicitud con el token de autorización.
 *
 * @param {InternalAxiosRequestConfig} config - El objeto de configuración de la solicitud de Axios.
 * @returns {InternalAxiosRequestConfig|null} El objeto de configuración de la solicitud de Axios actualizado o null si ocurre un error.
 */
const updateHeaders = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  try {
    const token = localStorage.getItem('accessToken')

    const language = localStorage.getItem('language')

    config.headers = {
      ...config.headers,
      Authorization: config.headers['Authorization'] ?? `Bearer ${token}`,
      'Content-Type': config.headers['Content-Type'] ?? 'application/json',
      'Accept-Language': language ?? 'en',
    } as unknown as AxiosRequestHeaders

    return config
  } catch (error) {
    console.error('[ERROR_UPDATE_HEADER]', error)
    return config
  }
}

/**
 * Interceptor de solicitudes para actualizar los encabezados antes de enviar la solicitud.
 *
 * @function
 * @param {Object} config - El objeto de configuración de la solicitud de Axios.
 * @returns {Object} El objeto de configuración de la solicitud de Axios actualizado.
 * @throws {Error} Si ocurre un error durante la intercepción de la solicitud.
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => updateHeaders(config),
  (error: AxiosError) =>
    Promise.reject(new Error('Request Interceptor Error: ' + error)),
)

/**
 * Interceptor de respuestas para manejar respuestas y errores.
 *
 * @function
 * @param {Object} response - El objeto de respuesta de Axios.
 * @returns {Object} El objeto de respuesta de Axios.
 * @throws {Error} Si ocurre un error durante la intercepción de la respuesta.
 */
api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    // TODO: Agregar funcion para cerrar la sesión
    // if (error?.response?.status === 401) {
    //   logout()
    // }
    return Promise.reject(error)
  },
)

export default api
