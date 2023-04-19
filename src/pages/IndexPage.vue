<template>
  <q-page class="flex flex-center">
    <h1>{{this.user.details.username}}</h1>
    <div v-if="thereAreTraining">
      <h6>Hai un'allenamento in sospeso, vuoi riprenderlo ?</h6>
      <q-btn push color="white" text-color="primary" label="Riprendi allenamento" @click="pushToTraining" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useUserStore } from "stores/user";
import { getOnGoingTraining } from "src/api/training";
import _ from "lodash";

export default defineComponent({
  name: 'IndexPage',
  data(){
    return{
      user: useUserStore(),
      thereAreTraining: ref(false),
      onGoingTraining: ref(null)
    }
  },
  methods:{
    getLastOnGoingTraining: async function() {
      const res = await getOnGoingTraining();
      if(res){
        this.thereAreTraining = true;
        this.onGoingTraining = res;
      }
    },
    pushToTraining: function() {
      this.$router.push("/training/ongoing/" + this.onGoingTraining._id);
    }
  },
  mounted: function(){
    if(!this.user.token){
      this.$router.push("/auth");
    }
    this.getLastOnGoingTraining();
  }
})
</script>
