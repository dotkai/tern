<template>
<div style="height: 100px; width: 100px"
    class="q-mr-md">
  <q-img
    v-if="path"
    :src="'/image_files/'+path"
    error-src="util_images/noimage.png"
    spinner-color="white"
    style="height: 100px; width: 100px"
    />
  <div
    v-else
    class="bg-grey-4 row justify-center items-center"     
    style="height: 100px; width: 100px">
    <q-icon name="image" size="lg" color="grey-6"/>
  </div>
</div>
</template>

<script setup>
defineProps({
  path: String
})
</script>