<template>
<audio controls :src="playAudioPath" style="width: 100%;">
  Audio file type not supported.
</audio>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';

const props = defineProps({
  src: String
})

const displayPath = ref('')
const playAudioPath = computed(() => {
  if(!displayPath.value) return ''
  return _toFileUrl(displayPath.value)
})

watch(() => props.src, async (nu) => {  
  if(!nu) return;
  displayPath.value = await window.electronFs.getAudioUrl(nu)
})

onMounted(async () => {
  if(!props.src) return;
  displayPath.value = await window.electronFs.getAudioUrl(props.src)
})

function _toFileUrl(filePath) {
  const normalized = filePath.replace(/\\/g, '/')
  return `file:///${normalized}`
}

function getAudioMimeType(path) {
  const ext = path.split('.').pop().toLowerCase()
  const map = {
    mp3: 'audio/mpeg',
    wav: 'audio/wav',
    ogg: 'audio/ogg',
    m4a: 'audio/mp4',
    aac: 'audio/aac',
    flac: 'audio/flac',
    webm: 'audio/webm'
  }
  return map[ext] || 'audio/*'
}
</script>