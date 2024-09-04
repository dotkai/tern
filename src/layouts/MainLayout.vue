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
          Tour Wizard
        </q-toolbar-title>

        <q-btn 
          flat
          dense
          round
          icon="more_vert">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>New tab</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>New incognito tab</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup>
                <q-item-section>Recent tabs</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="200"
    >
      <q-list>
        <q-item-label class="row justify-between">
          <q-btn round flat icon="menu_open" color="grey" @click="leftDrawerOpen = false" />
          <q-btn round flat icon="help_outline" color="grey"  />
        </q-item-label>

        <q-separator/>

        <q-item
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        >
          <q-item-section
            v-if="link.icon"
            avatar
          >
            <q-icon :name="link.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ link.title }}</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

defineOptions({
  name: 'MainLayout'
})

const $q = useQuasar()
const linksList = [
  {
    title: 'Tours',
    to: { name: 'home' }
  }, {
    title: 'Tour Stops',
    to: { name: 'stops' }
  }, {
    title: 'Scripts',
    to: { name: 'scripts' }
  }, {
    title: 'Locations',
    to: { name: 'location' }
  }, {
    title: 'Images',
    to: { name: 'images' }
  }, {
    title: 'Tag Groups',
    to: { name: 'groups' }
  }
]

const leftDrawerOpen = ref(false)
const passcode = ref('rMbpL@-t7s2jHodHNb$x%xzt7QoIy9|jW5AQZol&')

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function setCookie(){
  $q.cookies.set('passcode', passcode)
}
</script>
