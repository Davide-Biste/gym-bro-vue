<template>
  <q-page
    class="flex flex-center"
  >
    <q-card class="card window-width window-height">
      <q-card-section>
        <h1 class="text-h5">Register</h1>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-form
          @submit="onRegister"
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
            :type="isPwd ? 'password' : 'text'"
            v-model="password"
            label="Your password *"
            lazy-rules
            :rules="[
          val => val !== null && val !== '' || 'Please type your password',
          val => val.length > 8 || 'Password must be at least 8 characters'
        ]"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <q-input
            filled
            :type="isPwd ? 'password' : 'text'"
            v-model="password2"
            label="Repeat Password*"
            lazy-rules
            :rules="[
          val => val !== null && val !== '' || 'Please type your password',
          val=> val === password || 'Passwords must match'
        ]"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

            <q-toggle v-model="accept" label="I accept the license and terms" />
          <div>
            <q-btn label="Register" type="submit" color="positive"/>
            <q-btn label="Reset" type="reset" color="warning" class="q-ml-sm" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script>
import auth from "../../api/auth";
export default {
  data(){
    return{
      username: null,
      password: null,
      password2: null,
      isPwd: true,
      accept: false
    }
  },
  methods:{
    onRegister: async function(){
      if(this.accept){
        await auth.register(this.username, this.password);
        this.$router.push("/auth");
      }
    },
    onReset(){
      this.username = null;
      this.password2 = null;
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
  max-height: 500px;
}
</style>
