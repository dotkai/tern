<template>
<div class="row">
  <div v-if="offset" class="col-2"></div>
  <div class="row q-mb-md" :class="offset? 'col' : 'full-width'">
    <div class="col-2 text-h6 align-center">{{name}}</div>
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