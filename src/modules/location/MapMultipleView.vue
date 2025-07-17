<template>
  <div ref="mapContainer" style="height: 500px; border-radius: 8px; overflow: hidden;" />
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const props = defineProps({
  locations: {
    type: Array,
    required: true
  }
})

const mapContainer = ref(null)
const map = ref(null)
const markers = ref([])

onMounted(() => {
  map.value = L.map(mapContainer.value).setView([0, 0], 2) // Start zoomed out
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map.value)

  renderMarkers()
})

watch(() => props.locations, () => {
  clearMarkers()
  renderMarkers()
}, { deep: true })

function clearMarkers() {
  markers.value.forEach(marker => map.value.removeLayer(marker))
  markers.value = []
}

async function renderMarkers() {
  const bounds = L.latLngBounds([])

  for (const item of props.locations) {
    let lat, lon

    if (item.maptype === 'COORD') {
      lat = item.value.lat
      lon = item.value.lon
    } else if (item.maptype === 'ADDRESS') {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(item.value)}`)
      const data = await res.json()
      if (!data[0]) continue
      lat = parseFloat(data[0].lat)
      lon = parseFloat(data[0].lon)
    }

    if (lat != null && lon != null) {
      const marker = L.marker([lat, lon]).addTo(map.value)
      markers.value.push(marker)
      bounds.extend([lat, lon])
    }
  }

  if (bounds.isValid()) {
    map.value.fitBounds(bounds, { padding: [20, 20] })
  }
}
</script>
