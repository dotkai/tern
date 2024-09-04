<template>
<div class="q-pa-md q-gutter-sm">
    <q-btn label="Upload" icon="upload" color="primary" @click="dialog = true" />

    <q-dialog
      v-model="dialog"
      persistent
      maximized
      transition-show="slide-up"
      transition-hide="slide-down"
      >
      <q-card class="bg-primary">
          <q-bar>
              <q-space />
              <q-btn flat icon="close" color="white" v-close-popup>
                  <q-tooltip class="bg-white text-primary">Close</q-tooltip>
              </q-btn>
          </q-bar>

          <q-uploader
              :url="uploadUrl"
              label="Add images"
              multiple
              batch
              with-credentials
              class="full-width full-height q-mt-md"
              @uploaded="fetchDirectoryContent" />
      </q-card>
    </q-dialog>
</div>
</template>
    
<script setup>
import { ref } from 'vue'
const dialog = ref(false)

function fetchDirectoryContent(){
    this.$api.get(this.uploadUrl)
      .then(v => this.directoryContent = v.data)
      .catch(err => this.$root.$error(err))
  }

    
</script>