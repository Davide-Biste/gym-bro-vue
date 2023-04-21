<template>
  <q-page>
    <div>

      <q-form class="form">
        <q-table
          :title="exercise?.listExercise?.name"
          :rows="rows"
          :columns="columns"
          row-key="name"
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn icon="mode_edit"/>
              <q-btn icon="delete" @click="deleteReps(props)"/>
            </q-td>
          </template>
        </q-table>
        <div class="flex q-pa-md full-width">
          <q-btn class="full-width" push color="white" type="submit" text-color="primary" label="Nuova Ripetizione" @click="radio"/>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { getSingleExercise } from "src/api/exercise";
import { deleteReps, getReps } from "src/api/reps";
import moment from "moment";
import { useQuasar } from "quasar";
import DialogAddReps from "components/DialogAddReps.vue";
import { useRoute } from "vue-router/dist/vue-router";
import { useRepsStore } from "stores/reps";
import { mapStores } from "pinia";

export default {
  name: "CurrentExercise",
  data(){
    return {
      exercise: {},
      rows: [],
      columns:[
        {
          name: 'counter',
          label: 'N',
          align: 'left',
          field: row=> row.index,
          format: val => `${val}°`,
          sortable: true,
          style: 'width: 10px',
        },
      {
        name: 'series',
        label: 'Ripetizioni',
        field: row=> row.series,
        format: val => `${val}r`,
        align: 'center',
        sortable: true,
      },
      {
        name: 'weight',
        label: 'Peso',
        field: row=> row.weight,
        format: val => `${val} kg`,
        align: 'center',
        sortable: true,
      },
        {
          name: 'rest',
          label: 'Pausa',
          field: row=> row.rest,
          format: val => `${moment.duration(val,"second").minutes()}:${moment.duration(val,"second").seconds() < 10 ? '0' : ''}${moment.duration(val,"second").seconds()}`,
          align: 'right',
          sortable: true,
        },
        {
          name: "actions",
          label: "Azioni",
        }]
    };
  },
  mounted: function () {
    this.getExercise();
    this.getReps();
    this.rows = this.repsStore.reps
  },
  watch: { //update Dynamically reps
    repsStore: {
      handler: function (val) {
        this.rows = val.reps;
      },
      deep: true
    }
  },
  methods: {
    async getExercise(){
      this.exercise = await getSingleExercise(this.$route.params.id);
    },
    async getReps(){
      await getReps(this.$route.params.id);
    },
    async deleteReps(props){
      return await deleteReps(props);
    }
  },
  setup() {
    const $q = useQuasar();
    const route = useRoute();
    function radio() {
      const exerciseId = route.params.id;
      $q.dialog({
        component: DialogAddReps,
        componentProps: {
          exerciseId: exerciseId
        }
      }).onOk(function(data) {
        /*repsStore.setReps(data);*/

      }).onCancel(() => {
        console.log('>>>> CANCELLED')
      }).onDismiss(() => {
      })
    }

    return {
      radio,
    }
  },
  computed: {
    ...mapStores(useRepsStore)
  },
};
</script>

<style scoped>
form {
  box-sizing: border-box;
  padding: 50px;
  display: flex;
  flex-direction: column;
}
</style>
