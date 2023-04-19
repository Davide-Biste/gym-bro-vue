<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
        <div class="q-pa-md" style="max-width: 400px">

          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
          >
            <q-input
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
              v-model="rest"
              type="number"
              label="Pausa"
              hint="Quanti secondi di pausa hai fatto?"
              lazy-rules
              :rules="[
                val => checkRest(val) || 'Inserisci un valore',
                val => val > 0 || 'Inserisci un valore maggiore di 0', ]"
            />

            <div>
              <q-btn label="Submit" type="submit" color="primary"/>
              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
          </q-form>
        </div>
      <q-card-actions align="right">
        <q-btn color="primary" label="Cancel" @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from 'quasar'
import { ref } from "vue";

const props = defineProps({

});

const series = ref(null);
const rest = ref(60);
const weight = ref(null);

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits
])

function onSubmit () {
 console.log({ series, rest, weight });
  onDialogOK();
  // or with payload: onDialogOK({ ... })
  // ...and it will also hide the dialog automatically
}
function onReset () {
  this.series = null;
  this.reps = null;
  this.weight = null;
}
function checkRest(rest){
  return rest > 0 && rest;
}

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

// this is part of our example (so not required)
function onOKClick () {
  // on OK, it is REQUIRED to
  // call onDialogOK (with optional payload)
  onDialogOK()
  // or with payload: onDialogOK({ ... })
  // ...and it will also hide the dialog automatically
}
</script>
