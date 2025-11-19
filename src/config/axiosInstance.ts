import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://ifcsde-apise-ppluvmz2chnl-1091653442.ca-central-1.elb.amazonaws.com/api/v1', // fallback to relative URLs
  headers: {
    'Content-Type': 'application/json',
  },
})

// Example interceptor
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('Axios Error:', error)
    return Promise.reject(error)
  }
)

export default axiosInstance
