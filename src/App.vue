<template>
  <router-view />
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import onExport from './utils/onExport'
import onImport from './utils/onImport'
import { NotifyService } from './services'
import { useRouter } from 'vue-router'
import { store } from 'quasar/wrappers'

const message = new NotifyService('Import')
const router = useRouter()

// Define IPC listeners
function handleExport() {
  onExport().catch(message.error)
}

async function handleImport() {
  onImport()
  .then(() => {
    message.message('Import successful. Refreshing page...')
    router.go()
  })
  .catch(message.error)
}

onMounted(() => {
  window.electronAPI?.onExportBackup(handleExport)
  window.electronAPI?.onImportBackup(handleImport)

  store.publicFolder
})

onBeforeUnmount(() => {
  window.electronAPI?.removeExportBackupListener?.(handleExport)
  window.electronAPI?.removeImportBackupListener?.(handleImport)
})
</script>
