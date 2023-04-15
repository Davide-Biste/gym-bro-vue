// stores/counter.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => { //le mie variabili
    return {
      id: null,
      token: null,
      details: [],
    }
  },
  actions: {
    setToken(state) {
      this.token = state;
    },
    setId(state) {
      this.id = state;
    },
    setDetails(state) {
      this.details = state;
    }
  },
  getters: {
    user(){
      return { id: this.id, token: this.token, details: this.details };
    }
  },
  persist: true,
})
