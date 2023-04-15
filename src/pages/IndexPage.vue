<template>
  <q-page class="flex flex-center">
    <h1>{{this.user.details.username}}</h1>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useUserStore } from "stores/user";

export default defineComponent({
  name: 'IndexPage',
  data(){
    return{
      user: useUserStore()
    }
  },
  mounted: function(){
    if(!this.user.token){
      this.$router.push("/auth");
    }
  }
})
</script>
