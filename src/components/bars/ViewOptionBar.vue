<template>
<div class="row justify-between q-ma-md">
    <q-input filled :model-value="filter" label="Filter">
        <template v-slot:prepend>
        <q-icon name="search" />
        </template>
    </q-input>
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
const props = defineProps({
    filter: String,
    addlink: Object
})
</script>