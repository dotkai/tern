<template>
<q-btn
  flat
  label="Export"
  icon="file_download"
  :disable="disable" />
</template>

<script setup>
defineProps({
  disable: Boolean
})
</script>