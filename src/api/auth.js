import {api} from 'boot/axios';
export default {
  login: async (email, password) => {
    try {
      const { data: token } = await api.post('/auth/login', { email, password });
      console.log(token)
      return token;
    } catch (error) {
      console.log({error})
    }
  }
}
