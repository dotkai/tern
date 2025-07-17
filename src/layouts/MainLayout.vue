<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="shadow-2">
      <q-toolbar>
        <q-btn
          v-if="!leftDrawerOpen"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          class="q-mr-md"
          @click="toggleLeftDrawer"
        />

        <q-avatar>
          <img src="destination.png">
        </q-avatar>

        <q-toolbar-title>
          Tern
        </q-toolbar-title>

        <AppMenu />
      </q-toolbar>
    </q-header>

    <MainDrawer v-model:leftDrawerOpen="leftDrawerOpen" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import MainDrawer from 'src/modules/navigation/MainDrawer.vue';
import AppMenu from 'src/modules/navigation/AppMenu.vue';

defineOptions({
  name: 'MainLayout'
})

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
