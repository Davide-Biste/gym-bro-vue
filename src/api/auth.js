import {api} from 'boot/axios';
import { useUserStore } from "stores/user";
export default {
  login: async (username, password) => {
    try {
      const { data: token } = await api.post('/auth/login', {}, {
        auth: {
          username,
          password
        }
      });
      const user = useUserStore();
      await user.setToken(token);
      await user.setDetails({username, password});
      return token;
    } catch (error) {
      console.log({error})
    }
  }
}
