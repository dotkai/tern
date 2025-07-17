<template>
<section>
  <MapOneView
    :maptype="store.maptype"
    :address="store.address"
    :coords="store.coords" />
</section>
</template>

<script setup>
import 'leaflet/dist/leaflet.css'
import { useLocationStore } from 'src/modules/location/LocationStore';
import MapOneView from 'src/modules/location/MapOneView.vue';

const store = useLocationStore()

</script>
