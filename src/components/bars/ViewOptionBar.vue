<template>
<div class="row justify-between q-ma-md">
    <FilterInput :filter="filter" />
    <div>
        <q-btn 
            v-if="addlink" 
            outline
            label="Add" icon="add" color="blue" 
            :to="addlink" />
    </div>
</div>
</template>

<script setup>
import FilterInput from '../forms/FilterInput.vue';

const props = defineProps({
    filter: String,
    addlink: Object
})
</script>