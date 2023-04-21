import { defineStore } from 'pinia'

export const useRepsStore = defineStore('reps', {
  state: () => { //le mie variabili
    return {
      reps: [],
    }
  },
  actions: {
    firstSetReps(state) {
      this.reps = [...state];
    },
    initReps(){
      this.reps = [];
    },
    pushReps(state) {
      this.reps.push(state);
    },
    deleteReps(state){
      console.log({state})
      this.reps = this.reps.filter((rep) => rep._id !== state.row._id);
    }
  },
  getters: {
    allReps(){
      return this.reps;
    }
  },
  persist: true,
})
