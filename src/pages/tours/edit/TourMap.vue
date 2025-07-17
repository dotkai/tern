<template>
<section>
  <MapMultipleView
  v-model:locations="displayLocationList" />
</section>
</template>

<script setup lang="ts">
import MapMultipleView from 'src/modules/location/MapMultipleView.vue';
import { computed, watch, ref, onMounted } from 'vue';
import { Database } from 'src/db/db';
import { useTourStore } from 'src/modules/tours/TourStore';

const store = useTourStore()
const StopDatabase = new Database('stories')
let filledStops = ref([])

watch(() => store.stops, async (nu) => {
  getStopData()
})

const displayLocationList = computed(() => {
  return filledStops.value
  .filter(item => item.locations?.length)  // Remove empty locations
  .map(item => {
    const el = item.locations[0]
    return {
      maptype: el.maptype,
      value: el.maptype === 'COORD'? el.coords : el.address
    }
  })
})

async function getStopData(){
  filledStops.value = await StopDatabase.getAllFilled(['locations'])
}

onMounted(() => {
  getStopData()
})
</script>