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
    <q-form
      @submit="onSubmitExercise"
      class="q-gutter-md q-pa-md flex-center"
    >
      <q-select
        filled
        v-model="names"
        :options="filterOptions"
        stack-label
        use-chips
        use-input
        @new-value="createValue"
        @filter="filterFn"
        label="Nuovo Esercizio"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
        <q-btn push color="white" type="submit" text-color="primary" label="Nuovo Esercizio" />
    </q-form>

  </div>
</div>
</template>

<script>
import { getTrainingById } from "src/api/training";
import { getExerciseByTrainingId, postNewExercise } from "src/api/exercise";
import { getAllListExercise } from "src/api/list-exercise";
import { ref } from "vue";

const stringOptions = [];
export default {
  name: "OnGoingTrainingPage",
  setup () {
  const filterOptions = ref(stringOptions)

  return {
  names: ref(null),
  filterOptions,

  createValue (val, done) {
  if (val.length > 0) {
  if (!stringOptions.includes(val)) {
  stringOptions.push(val)
}
  done(val, 'toggle')
}
},

  filterFn (val, update) {
  update(() => {
  if (val === '') {
  filterOptions.value = stringOptions
}
  else {
  const needle = val.toLowerCase()
  filterOptions.value = stringOptions.filter(
  v => v.toLowerCase().indexOf(needle) > -1
  )
}
})
}
}
},
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
          field: row => row?.listExercise?.name,
          format: val => `${val}`,
        },
      ],
      selectedNames:[],
    }
  },
  methods: {
    getTraining: async function() {
      this.currentTraining = await getTrainingById(this.$route.params.id);
    },
    getExercise: async function() {
      this.rows = await getExerciseByTrainingId(this.$route.params.id);
      console.log(this.rows)
    },
    getListExercise: async function(){
      const list = await getAllListExercise();
      for(let i = 0; i < list.length; i++){
        stringOptions.push(list[i].name);
      }
    },
    onSubmitExercise: async function(){
      const res = await postNewExercise(this.$route.params.id, this.names);
      if(res){
        await this.getExercise();
      }
    }
  },
  mounted() {
    this.getTraining();
    this.getExercise();
    this.getListExercise();
  },
};
</script>

<style scoped>

</style>
