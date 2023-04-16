import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { useUserStore } from "stores/user"

const user = useUserStore();

const configAxios = {
  baseURL: process.env.DEV_SERVER
};


const api = axios.create(configAxios)
api.interceptors.request.use(
  (config) => {
    // Do something before request is sent

    console.log({user})
    config.headers.Authorization = config.headers.Authorization || `Bearer ${user.token.token}`
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  });

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export {api}
