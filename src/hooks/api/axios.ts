import axios from "axios"
// import config from "../../config"

const instance = axios.create({
  // baseURL: config.indexerBaseUrl,
  baseURL: "https://api.llama.fi/",
  timeout: 60000,
})

export default instance
