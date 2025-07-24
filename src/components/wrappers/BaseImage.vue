<template>
<img :src="showImagePath" />
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
const props = defineProps({
  src: String
})
const displayPath = ref('')
const showImagePath = computed(() => {
  if(!displayPath.value) return '';
  return _toFileUrl(displayPath.value)
})
function _toFileUrl(filePath) {
  const normalized = filePath.replace(/\\/g, '/')
  return `file:///${normalized}`
}

onMounted(async () => {
  displayPath.value = await window.electronFs.getImageUrl(props.src)
})
</script>