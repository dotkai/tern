<template>
<div class="q-ma-lg text-indigo-3" style="text-align: center;">
    <q-icon :name="icon" size="32px" />
    <div class="text-h6">{{ label }}</div>
</div>
</template>

<script setup>
defineProps({
    label: String,
    icon: String
})
</script>