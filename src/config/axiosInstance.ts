import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL || ''}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('Axios Error:', error)
    return Promise.reject(error)
  }
)

export default axiosInstance
