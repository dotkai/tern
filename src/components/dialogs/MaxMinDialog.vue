<template>
<q-dialog 
    persistent
    :modelValue="modelValue" 
    @update:model-value="$emit('update:model-value')" 
    class="maxmin-dialog"
    :maximized="maximizedToggle"
    backdrop-filter="blur(4px)">
    <q-card :class="{ 'card-wrapper': !maximizedToggle }">
        <q-bar>
            <q-space />

            <q-btn v-if="maximizedToggle" dense flat icon="minimize" @click="maximizedToggle = false">
            <q-tooltip class="bg-white text-primary">Minimize</q-tooltip>
            </q-btn>
            <q-btn v-if="!maximizedToggle" dense flat icon="crop_square" @click="maximizedToggle = true">
            <q-tooltip  class="bg-white text-primary">Maximize</q-tooltip>
            </q-btn>
            <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
            </q-btn>
        </q-bar>

        <slot></slot>
    </q-card>
</q-dialog>
</template>

<script setup>
import {ref} from 'vue'
import _ from 'lodash'

const props = defineProps({
    modelValue: Boolean
})

const maximizedToggle = ref(false)
    
</script>

<style lang="scss">
.maxmin-dialog .card-wrapper {
    width:70%;
    max-width: 70%;
}
</style>