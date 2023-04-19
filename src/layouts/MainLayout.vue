<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title @click="this.$router.push('/')">
          Gym Bro
        </q-toolbar-title>

        <q-btn color="red" text-color="white" label="Logout" @click="logout"/>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Un po' di link utili...
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          @click="this.$router.push(link.route)"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useUserStore } from "stores/user";

const linksList = [
  {
    title: 'New Training',
    caption: 'Start a new Training',
    icon: 'fitness_center',
    route: '/training'
  },
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },
  data(){
    return {
      user: useUserStore()
    }
  },
  methods: {
    logout () {
      this.user.setToken("");
      this.$router.push("/auth");
    }
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
