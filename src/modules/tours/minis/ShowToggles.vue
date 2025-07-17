<template>
<div>
  <q-toggle
    :model-value="showImages"
    @update:model-value="v => $emit('update:show-images', v)"
    label="Show Images"
  />
  <q-toggle
    :model-value="showAudio"
    @update:model-value="v => $emit('update:show-audio', v)"
    :disable="disableAudio"
    label="Show Audio"
  />
</div>
</template>

<script setup>
defineProps({
  showImages: Boolean,
  showAudio: Boolean,
  disableAudio: Boolean
})
defineEmits(['update:show-images', 'update:show-audio'])
</script>