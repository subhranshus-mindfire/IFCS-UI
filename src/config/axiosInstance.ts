import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: `https://worrisome-overmodestly-nisha.ngrok-free.dev/api/v1`,
  headers: {
    'Content-Type': 'application/json',
    "ngrok-skip-browser-warning": "any-value"
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
