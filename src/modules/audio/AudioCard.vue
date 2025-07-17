<template>
<q-card class="col">
  <q-card-section class="q-pb-none q-pt-sm q-px-sm hover" @click="$emit('onclick')">
    <div class="text-subtitle2 ellipsis q-pa-sm">{{ name }}</div>
    <div>
        <q-chip v-for="tag in tags" :key="tag">{{ tag }}</q-chip>
    </div>
  </q-card-section>
  <q-card-section class="q-pt-none q-pb-sm q-px-sm">
    <AudioPlayer
      :audioPath="path"
    /> 
  </q-card-section>
</q-card>
</template>

<script setup>
import AudioPlayer from 'src/modules/audio/AudioPlayer.vue';

defineProps({
  name: String,
  path: String,
  tags: Array
})
defineEmits(['onclick'])
</script>