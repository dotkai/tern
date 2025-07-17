<template>
<q-card class="shadow-1 q-mb-md">
  <q-card-section>
    <div class="text-center">
      <img :src="'image_files/'+image.path"
        style="max-width: 100%" />
    </div>
    <div class="row justify-between text-subtitle2">
      <div>{{ image.name }}</div>
      <div>{{ image.stopNumber }}. {{ image.stopName }}</div>
    </div>
    <p>{{ image.caption }}</p>
  </q-card-section>
</q-card>
</template>

<script setup>
defineProps({
  image: Object
})
</script>
