<template>
<div class="q-mr-md">
  <q-img
    v-if="filename"
    :src="displayPath"
    error-src="util_images/noimage.png"
    spinner-color="white"
    style="width:100%; height:100%"
    />
  <div
    v-else
    class="bg-grey-4 row justify-center items-center"
    style="width:100%; height:100%">
    <q-icon name="image" size="lg" color="grey-6"/>
  </div>
</div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
  filename: String,
  ratio: Number
})

watch(() => props.filename, async (nu) => {  
  if(!nu) return;
  displayPath.value = await window.electronFs.getImageUrl(nu)
})

const displayPath = ref('')

onMounted(async () => {
  if(!props.filename) return;
  displayPath.value = await window.electronFs.getImageUrl(props.filename)
})
</script>