<template>
<div class="q-pa-md row items-start">
  <div v-if="image" class="col row">
    <q-img
      v-for="img in modelValue" :key="img"
      spinner-color="white"
      error-src="util_images/noimage.png"
      style="height: 140px; max-width: 150px"
    />
  </div>
  <div v-else class="col">
    <q-card v-for="item in modelValue" :key="item">
      <q-card-section>
        <q-icon name="music_note" />
        <span>{{item}}</span>
      </q-card-section>
    </q-card>
  </div>
</div>
</template>

<script setup>
defineProps({
  modelValue: Array,
  uploadTarget: String,
  image: Boolean
})

</script>