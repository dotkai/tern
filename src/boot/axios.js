import { boot } from 'quasar/wrappers'
import axios from 'axios'

const DEV_URL = 'http://localhost:4600';
const PROD_URL = 'https://topicboston.dotkaiapps.net/';
// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ 
  baseURL: process.env.DEV? DEV_URL : PROD_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-TopicBoston-Mask': 1
  }
})

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
