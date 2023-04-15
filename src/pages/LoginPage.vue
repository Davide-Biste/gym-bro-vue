<template>
  <q-page
    class="flex flex-center"
  >
    <q-card class="card window-width window-height">
      <q-card-section>
        <h1 class="text-h5">Login</h1>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
            <q-input
              filled
              v-model="username"
              label="Your Username *"
              hint="Username is required"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />

            <q-input
              filled
              type="text"
              v-model="password"
              label="Your password *"
              lazy-rules
              :rules="[
          val => val !== null && val !== '' || 'Please type your password',
          val => val.length > 0 && val.length < 8 || 'Password must be at least 8 characters'
        ]"
            />

            <q-toggle v-model="accept" label="I accept the license and terms" />
          <div>
            <q-btn label="Login" type="submit" color="positive"/>
            <q-btn label="Reset" type="reset" color="warning" class="q-ml-sm" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script>
export default {
  data(){
    return{
      username: "",
      password: "",
      accept: false
    }
  },
  methods:{
    onSubmit(){
      if(this.accept !== true){
        $q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })
      }
      else{
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      }
    },
    onReset(){
      this.username = null;
      this.password = null;
      this.accept = false;
    }
  }
}
</script>
<style scoped>
.card {
  border-radius: 10px;
  max-width: 600px;
  max-height: 420px;
}
</style>
