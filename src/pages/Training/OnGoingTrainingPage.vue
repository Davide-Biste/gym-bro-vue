<template>
<div>
  <h3> Your id is {{$route.params.id}} </h3>
  <div class="q-pa-md">
    <q-table
      title="Esercizi"
      :rows="rows"
      :columns="columns"
      row-key="name"
    />
    <q-select
      filled
      v-model="selectedNames"
      :options="options"
      stack-label
      use-chips
      use-input
      @new-value="createValue"
      @filter="filterFn"
      label="Nuovo Esercizio"
    />
  </div>
</div>
</template>

<script>
import { getTrainingById } from "src/api/training";
import { getExerciseByTrainingId } from "src/api/exercise";
import _ from "lodash";
import { getAllListExercise } from "src/api/list-exercise";

export default {
  name: "OnGoingTrainingPage",
  data(){
    return{
      currentTraining: {},
      rows: [],
      columns:[
        {
          name: 'Name',
          required: true,
          label: 'Name of exercise',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
        },
      ],
      names:[],
      selectedNames:[],
    }
  },
  methods: {
    getTraining: async function() {
      const training = await getTrainingById(this.$route.params.id);
      this.currentTraining = training;
    },
    getExercise: async function() {
      const exercise = await getExerciseByTrainingId(this.$route.params.id);
      this.rows = exercise;
    },
    getListExercise: async function(){
      const list = await getAllListExercise();
      console.log({list})
      this.names = list;
    },
    createValue (val, done) {
      if (val.length > 0) {
        const isPresent = _.includes(this.names,val);
        console.log({isPresent})
        //TODO: sistemare
        done(val, 'toggle')
      }
    },
    filterFn (val, update) {
      update(()=>{
        const needle = val.toLowerCase()
        return this.options.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
  },
  mounted() {
    this.getTraining();
    this.getExercise();
    this.getListExercise();
  },
  computed: {
    options() {
      return this.names.map(name => name.name);
    }
  },
};
</script>

<style scoped>

</style>
