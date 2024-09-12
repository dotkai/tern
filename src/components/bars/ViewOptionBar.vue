<template>
<div class="row justify-between q-ma-md">
    <FilterInput :filter="filter" />
    <div>
        <q-btn 
            v-if="addlink" 
            outline
            label="Add" icon="add" color="blue" 
            @click="navstore.stashReturn($router, $route, addlink)" />
    </div>
</div>
</template>

<script setup>
import FilterInput from '../forms/FilterInput.vue';
import { useNavigationStore } from 'src/modules/navigation/NavigationStore';

const props = defineProps({
    filter: String,
    addlink: Object
})
const navstore = useNavigationStore()
</script>