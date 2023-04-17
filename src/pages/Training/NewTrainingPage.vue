<template>
  <q-card class="my-card">
    <q-card-section>
      <div class="q-pa-md">
        <q-select
          filled
          v-model="selectedNames"
          multiple
          :options="options"
          use-chips
          stack-label
          use-input
          @new-value="createValue"
          @filter="filterFn"
          label="Multiple selection"
        />
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions vertical>
      <q-btn flat @click="startTraining">Inizia Allenamento</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { getAllTrainingNames, postNewTraining } from "src/api/training";
import _ from "lodash";

export default {
  data(){
    return {
      names:[],
      selectedNames:[],
    }
  },
  computed: {
      options() {
        return this.names.map(name => name._id);
      }
  },

  methods: {
    getNames:async function(){
      const names = await getAllTrainingNames();
      this.names = names;
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
    startTraining: async function(){
      const title = _.map(this.selectedNames, (name) => name);
      const nT = await postNewTraining(title);
      this.$router.push(`/training/ongoing/${nT._id}`);
    }
  },
  mounted(){
    this.getNames();
  },
}
</script>

<style scoped>

</style>
