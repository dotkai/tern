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
const props = defineProps({
    address: String,
    lat: [Number, String],
    long: [Number, String]
})

function openLocation(){
    const linkLocation = `http://maps.google.com/?q=${props.address}`
    const latlong = `https://maps.google.com/?q=${props.lat},${props.lon}`
    window.open(props.lat && props.lon? latlong : linkLocation )
}
</script>