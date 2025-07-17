<template>
<div>
  <q-btn 
    flat
    dense
    round
    icon="more_vert">
    <q-menu>
      <q-list style="min-width: 100px">
        <q-item clickable v-close-popup @click="aboutDialog = true">
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>
          <q-item-section>About</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable v-close-popup @click="settingDialog = true">
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>Settings</q-item-section>
        </q-item>
        <!-- <q-item clickable v-close-popup>
          <q-item-section avatar>
            <q-icon name="cloud_upload" />
          </q-item-section>
          <q-item-section>Remote</q-item-section>
        </q-item> -->
      </q-list>
    </q-menu>
  </q-btn>

  <AboutDialog
    v-model="aboutDialog" />
  <SettingsDialog
    v-model="settingDialog" />
    
</div>
</template>

<script setup>
import { ref } from 'vue';
import SettingsDialog from '../management/SettingsDialog.vue';
import AboutDialog from '../management/AboutDialog.vue';

const aboutDialog = ref(false)
const settingDialog = ref(false)
</script>