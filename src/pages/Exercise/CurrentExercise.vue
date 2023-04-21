<template>
  <q-page>
    <div>
      <q-form class="form">
        <q-table
          :title="exercise?.listExercise?.name"
          :rows="rows"
          :columns="columns"
          row-key="name"
        />
        <div class="flex q-pa-md full-width">
          <q-btn class="full-width" push color="white" type="submit" text-color="primary" label="Nuova Ripetizione" @click="radio"/>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { getSingleExercise } from "src/api/exercise";
import { getReps } from "src/api/reps";
import moment from "moment";
import { useQuasar } from "quasar";
import DialogAddReps from "components/DialogAddReps.vue";
import { useRoute } from "vue-router/dist/vue-router";

export default {
  name: "CurrentExercise",
  data(){
    return {
      exercise: {},
      rows:[],
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
        }]
    };
  },
  mounted: function () {
    this.getExercise();
    this.getReps();
  },
  methods: {
    async getExercise(){
      this.exercise = await getSingleExercise(this.$route.params.id);

    },
    async secondsToMinutesAndSeconds(seconds) {
      const duration = moment.duration(seconds, 'seconds');
      return duration.minutes() + ':' + (duration.seconds() < 10 ? '0' : '') + duration.seconds();
    },
    async getReps(){
      const res = await getReps(this.$route.params.id);
      this.rows = res.data;
    }
  },
  setup () {
    const $q = useQuasar();
    const route = useRoute();

    function radio (){
      const exerciseId = route.params.id;
      $q.dialog({
        component: DialogAddReps,
        componentProps: {
         exerciseId: exerciseId
        }
      }).onOk((data) => {
        console.log('>>>> OK, received', data);
      }).onCancel(() => {
        console.log('>>>> CANCELLED')
      }).onDismiss(() => {
        console.log('>>>> DISMISSED')
      })
    }
    return {
      radio
    }
  }
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
