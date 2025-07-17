<template>
<div class="row">
  <div v-if="offset" class="col-2"></div>
  <div class="row q-mb-md" :class="offset? 'col' : 'full-width'">
    <div class="text-subtitle-2 align-center q-mr-md q-pt-sm" style="width: 80px;">{{name}}</div>
    <slot></slot>
  </div>
</div>
</template>

<script setup>
const props = defineProps({
  name: String,
  offset: Boolean
})
</script>