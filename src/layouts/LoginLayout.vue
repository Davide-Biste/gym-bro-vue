<template>
  <div class="bg-image q-pa-md">
    <div class="bg-overlay"></div>
    <q-layout view="hHh lpR fFf">
      <q-header elevated class="bg-primary text-white">
        <q-toolbar>
          <q-toolbar-title>
            <q-avatar @click="this.$router.push('/')">
              <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
            </q-avatar>
            Gym bro
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<style scoped>
.bg-image {
  height: 100%;
  position: relative;
}
.bg-overlay {
  background-image: url('~assets/gym-back.jpg');
  background-size: cover;
  background-position: center;
  height: 100%;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  filter: blur(5px);
}
.q-layout {
  position: relative;
  z-index: 1; /* porta il layout principale sopra la pesatrice e l'immagine sfocata.*/
}
</style>
