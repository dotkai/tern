<template>
<q-btn 
    flat
    icon="visibility"
    color="primary"
    label="Preview"
    @click="openLocation"
    />
</template>

<script setup>
import {computed} from 'vue'
const props = defineProps({
    address: String,
    lat: [Number, String],
    long: [Number, String]
})

function openLocation(){
    const linkLocation = `http://maps.google.com/?q=${props.address}`
    const latlong = `https://maps.google.com/?q=${props.lat},${props.long}`
    window.open(props.lat && props.long? latlong : linkLocation )
}
</script>