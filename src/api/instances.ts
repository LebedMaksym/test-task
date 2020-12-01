import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.SPOTIFY_BASE_API_URL
})

export default axiosInstance
