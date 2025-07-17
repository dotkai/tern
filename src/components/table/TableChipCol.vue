<template>
<q-td :props="props">
  <q-chip
    v-for="tag in props.row.tags"
    :key="tag"
    dense
    color="grey"
    text-color="white"
    class="q-mr-xs q-mb-xs"
  >
    {{ tag }}
  </q-chip>
</q-td>
</template>

<script setup>
defineProps({
  props: Object
})
</script>