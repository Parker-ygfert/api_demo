import axios from 'axios'

const Axios = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_HOST,
    timeout: 1000
  })

  return instance
}

export default Axios()
