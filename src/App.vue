<template>
  <router-view />
</template>

<script setup>
import { onMounted, onBeforeUnmount, getCurrentInstance } from 'vue'
import { useQuasar } from 'quasar'
import onExport from './utils/onExport'
import onImport from './utils/onImport'

const $q = useQuasar()
const vm = getCurrentInstance()

function triggerError(err) {
  $q.notify({
    type: 'negative',
    message: err?.message || 'Error',
    actions: [{ icon: 'clear', color: 'white', round: true }]
  })
}

function triggerPositive(msg) {
  $q.notify({
    type: 'positive',
    message: msg,
    actions: [{ icon: 'clear', color: 'white', round: true }]
  })
}

// Make global notify methods
vm.appContext.app.config.globalProperties.$error = triggerError
vm.appContext.app.config.globalProperties.$success = triggerPositive

// Define IPC listeners
function handleExport() {
  onExport().catch(triggerError)
}

function handleImport() {
  onImport().catch(triggerError)
}

onMounted(() => {
  window.electronAPI?.onExportBackup(handleExport)
  window.electronAPI?.onImportBackup(handleImport)
})

onBeforeUnmount(() => {
  window.electronAPI?.removeExportBackupListener?.(handleExport)
  window.electronAPI?.removeImportBackupListener?.(handleImport)
})
</script>
