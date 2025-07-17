<template>
<div>{{ displayAddress }}</div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  maptype: String,
  address: String,
  coords: Object
})

const displayAddress = computed(() => {
  if(props.maptype !== 'COORD') return props.address;
  return `Lat: ${props.coords.lat || '(none)'}, Long: ${props.coords.lon || '(none)'}`
})
</script>