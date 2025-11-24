import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: `http://ifcsde-apise-ppluvmz2chnl-1091653442.ca-central-1.elb.amazonaws.com/api/v1`,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
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
