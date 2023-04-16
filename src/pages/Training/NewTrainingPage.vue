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
      <q-btn flat>Inizia</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { getAllTrainingNames } from "src/api/training";

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
      console.log({names});
      this.names = names;
    },
    createValue (val, done) {
      if (val.length > 0) {
        if (!this.options.includes(val)) {
          this.options.push(val)
        }
        done(val, 'toggle')
      }
    },
    filterFn (val, update) {
      update(()=>{
        const needle = val.toLowerCase()
        return this.options.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    }
  },
  mounted(){
    this.getNames();
  },
}
</script>

<style scoped>

</style>
