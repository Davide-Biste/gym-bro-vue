<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
        <div class="q-pa-md" style="max-width: 400px">
          <h1>{{exerciseId}}</h1>
          <q-form
            @submit="onSubmit"
            @reset="onReset"
          >
            <q-input
              class="q-ma-sm"
              filled
              v-model="series"
              type="number"
              label="Ripetizioni"
              hint="Quante ripetizioni hai fatto?"
              lazy-rules
              :rules="[
                val => val && val.length > 0 || 'Inserisci un valore',
                val => val > 0 || 'Inserisci un valore maggiore di 0', ]"
            />
            <q-input
              filled
              class="q-ma-sm"
              v-model="weight"
              type="number"
              label="Peso"
              hint="Quanti chili hai alzato?"
              lazy-rules
              :rules="[
                val => val && val.length > 0 || 'Inserisci un valore',
                val => val > 0 || 'Inserisci un valore maggiore di 0', ]"
            />
            <q-input
              filled
              class="q-ma-sm"
              v-model="rest"
              type="number"
              label="Pausa"
              hint="Quanti secondi di pausa hai fatto?"
              lazy-rules
              :rules="[
                val => checkRest(val) || 'Inserisci un valore',
                val => val > 0 || 'Inserisci un valore maggiore di 0', ]"
            />

            <div class="flex justify-center full-width q-ma-sm">
              <q-btn size="md" class="flex items-center full-width" label="Inserisci" type="submit" color="green-5"/>
            </div>
          </q-form>
        </div>
      <q-card-actions class="full-width" align="center">
        <q-btn class="full-width" color="red-5" label="Annulla" @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from 'quasar'
import { newReps } from "src/api/reps";

export default {
  data(){
    return{
      series: null,
      weight: null,
      rest: 60,
    }
  },
  props: ["exerciseId"],
  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits
  ],
  methods:{
    async onSubmit () {
      try{
        const res = await newReps(this.exerciseId,this.rest, this.series, this.weight);
        this.onOKClick(res);
      }
      catch(e){
        console.log(e);
        return [];
      }
    },

    onReset () {
      this.series = null;
      this.reps = null;
      this.weight = null;
    },
    checkRest(rest){
      return rest > 0;
    },
  },
  setup () {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    return {

      dialogRef,
      onDialogHide,

      onOKClick (res) {
        // on OK, it is REQUIRED to
        // call onDialogOK (with optional payload)
        onDialogOK(res)
        // or with payload: onDialogOK({ ... })
        // ...and it will also hide the dialog automatically
      },
      onDialogCancel,
      onCancelClick: onDialogCancel
    }
  }
}
</script>
