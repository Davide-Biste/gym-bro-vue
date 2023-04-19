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
import DialogAddReps from "components/DialogAddReps";

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
          format: val => `${moment(val).format('ss')} sec`,
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
    async getExercise() {
      this.exercise = await getSingleExercise(this.$route.params.id);
      console.log({ exercise: this.exercise })
    },
    async getReps(){
      const res = await getReps(this.$route.params.id);
      this.rows = res.data;
    }
  },
  setup () {
    const $q = useQuasar()
    function radio (){
      $q.dialog({
        component: DialogAddReps,
      }).onOk(data => {
        // console.log('>>>> OK, received', data)
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
