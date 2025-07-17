<template>
<div>
    <q-btn outline 
        color="primary"
        label="Browse" 
        :icon="icon"
        @click="dialog = true" />

    <q-dialog
      v-model="dialog"
      persistent
      maximized
      transition-show="slide-up"
      transition-hide="slide-down"
      >
      <q-card>
          <q-bar>
              <q-space />
              <q-btn flat icon="close" color="white" v-close-popup>
                  <q-tooltip class="bg-white text-primary">Close</q-tooltip>
              </q-btn>
          </q-bar>

          <slot></slot>
      </q-card>
    </q-dialog>
</div>
</template>
    
<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    type: String
})

const dialog = ref(false)
const icon = computed(_ => {
    if(props.type === 'image') return 'add_photo_alternate'
    return 'add'
})

    
</script>