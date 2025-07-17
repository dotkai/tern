<template>
  <div class="map-wrapper">
    <!-- Map container -->
    <div
      ref="mapContainer"
      class="map-container"
    />

    <!-- Overlay loading spinner -->
    <div
      v-if="loading"
      class="map-overlay"
    >
      <q-circular-progress
        indeterminate
        size="50px"
        color="primary"
      />
      <span class="text-subtitle-1 q-mt-sm">Updating map...</span>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { NotifyService } from 'src/services'

const props = defineProps({
  maptype: String,
  address: String,
  coords: Object
})

const message = new NotifyService('Map')

const loading = ref(false)
const map = ref(null)
const marker = ref(null)
const mapContainer = ref(null)

const mapProps = computed(() => ({
  type: props.maptype,
  address: props.address,
  coords: props.coords
}))

watch(mapProps, async ({ type, address, coords }) => {
  if (type === 'COORD') {
    await searchCoord(coords)
  } else {
    await searchAddress(address)
  }
})

onMounted(() => {
  loading.value = true;
  map.value = L.map(mapContainer.value).setView([0, 0], 13)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map.value)

  // Set init coordinates
  if(props.maptype === 'COORD') return searchCoord(props.coords)
  searchAddress(props.address)
})

async function searchAddress(address) {
  if (!address) return;
  loading.value = true;

  const query = encodeURIComponent(address)
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`

  try {
    const res = await fetch(url)
    const data = await res.json()

    if (data && data.length > 0) {
      const lat = parseFloat(data[0].lat)
      const lon = parseFloat(data[0].lon)

      map.value.setView([lat, lon], 15)

      if (marker.value) {
        marker.value.setLatLng([lat, lon])
      } else {
        marker.value = L.marker([lat, lon]).addTo(map.value)
      }
    } else {
      message.error('Address not found.')
    }
  } catch (err) {
    console.error('Geocoding failed', err)
    message.error('Failed to search address.')
  } finally {
    loading.value = false;
  }
}

async function searchCoord(coords){
  if(!coords.lat && ! coords.lon) return;
  loading.value = true;

  const lat = coords.lat;
  const lon = coords.lon;

  map.value.setView([lat, lon], 15)

  if (marker.value) {
    marker.value.setLatLng([lat, lon])
  } else {
    marker.value = L.marker([lat, lon]).addTo(map.value)
  } 
  loading.value = false;
}
</script>

<style>
.map-wrapper {
  position: relative;
}

.map-container {
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
}

/* Overlay on top of map */
.map-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(200, 200, 200, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  pointer-events: none; /* allows clicks to pass through if needed */
}
</style>