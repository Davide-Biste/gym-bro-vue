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
import auth from "../api/auth";
export default {
  data(){
    return{
      username: "",
      password: "",
      accept: false
    }
  },
  methods:{
    onSubmit: async function(){
      if(this.accept){
        await auth.login(this.username, this.password);
        this.$router.push("/");
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
