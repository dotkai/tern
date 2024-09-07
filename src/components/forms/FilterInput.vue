<template>
<q-input filled :model-value="filter" @update:model-value="v => $emit('update:filter', v)" label="Filter">
    <template v-slot:prepend>
    <q-icon name="search" />
    </template>
</q-input>
</template>

<script setup>
defineProps({
    filter: String
})
defineEmits(['update:filter'])
</script>