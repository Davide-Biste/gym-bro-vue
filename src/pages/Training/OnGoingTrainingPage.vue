<template>
<div>
  <h3> Your id is {{$route.params.id}} </h3>
  <div class="q-pa-md">
    <q-table
      title="Esercizi"
      :rows="rows"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn icon="mode_edit"/>
          <q-btn icon="delete"/>
        </q-td>
      </template>
      <template v-slot:body-cell-new-rep="props">
        <q-td :props="props">
          <q-btn icon="add" class="full-width" @click="goToExercise(props)"/>
        </q-td>
      </template>
    </q-table>
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
        <q-btn push color="white" type="submit" text-color="primary" label="Nuovo Esercizio"/>
    </q-form>
  </div>
  <div class="absolute-bottom">
    <div class="row">
      <div>
        <q-btn  size="lg" color="red-6" icon-right="home" label="Home" class="window-width" @click="this.$router.push('/')"/>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { getTrainingById } from "src/api/training";
import { getExerciseByTrainingId, postNewExercise } from "src/api/exercise";
import { getAllListExercise } from "src/api/list-exercise";
import moment from "moment";
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
            v => v.toLowerCase().indexOf(needle) > -1)
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
          sortable: true,
        },
        {
          name: 'Start',
          required: true,
          label: 'Iniziato alle:',
          align: 'left',
          field: row => row.start,
          format: val => `${moment(val).format('HH:mm:ss')}`,
          sortable: true,
        },
        {
          name: 'new-rep',
          label: 'Nuova Ripetizione',
          field: row=> row,
          align: 'center',
        },
        {
          name: 'actions',
          label: 'Azioni',
          align: 'right',
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
    },
    goToExercise: async function(exercise){
      this.$router.push(`/training/ongoing/${this.$route.params.id}/exercise/${exercise.value._id}`)
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
