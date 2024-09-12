<template>
<div>
    <q-btn 
        @mouseover="hover = true"
        @mouseleave="hover = false"
        flat
        :label="hover? 'Remove' : ''" 
        icon="delete" 
        :color="hover? 'negative' : 'grey'" 
        @click="$emit('remove')" />
</div>
</template>

<script setup>
import {ref} from 'vue'
const hover = ref(false)
</script>