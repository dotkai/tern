<template>
<div>
  <span class="text-subtitle2 q-px-sm">
    Preview
  </span>
  <q-btn
    flat
    rounded
    icon="all_out"
    @click="expandView = true"
    />

  <MaxMinDialog v-model="expandView">
    <slot></slot>
  </MaxMinDialog>
</div>
</template>

<script setup>
import MaxMinDialog from 'src/components/dialogs/MaxMinDialog.vue';
import { ref } from 'vue';

const expandView = ref(false)
</script>