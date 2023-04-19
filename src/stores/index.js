import { store } from 'quasar/wrappers'
import { createPinia } from 'pinia'
import { PiniaLogger } from "pinia-logger";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export default store(() => {
  const pinia = createPinia()
  const logger = PiniaLogger();
  pinia.use(piniaPluginPersistedstate);
  pinia.use(logger);
  return pinia
})

