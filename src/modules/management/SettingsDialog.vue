<template>
  <q-dialog :modelValue="modelValue" @update:modelValue="v => $emit('update:modelValue', v)">
    <q-card class="q-pa-md" style="min-width: 300px;">
      <q-card-section>
        <div class="text-h6 flex items-center">
          <q-icon name="settings" />
          <span class="q-px-md">Settings</span>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-toggle
          v-model="isDark"
          label="Dark Mode"
          left-label
          color="primary"
        />
        <!-- <q-select
          v-model="selectedTheme"
          :options="Object.keys(themes)"
          label="Theme"
          map-options emit-value
        /> -->
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Close" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useQuasar } from 'quasar'
import { applyTheme } from 'src/utils/theme'
import { themes } from 'src/assets/themes'

const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue'])

const selectedTheme = ref('default')
const isDark = ref(false)

const $q = useQuasar()

watch(() => props.modelValue, (val) => {
  if (val) {
    // When dialog opens, sync dark mode
    isDark.value = $q.dark.isActive
  }
})

watch(() => isDark.value, (val) => {
  $q.dark.set(val)
})

watch([selectedTheme], () => {
  try {
    applyTheme(selectedTheme.value, isDark.value) 
  } catch(e){
    console.log(e)
  }
})
</script>
