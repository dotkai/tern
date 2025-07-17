<template>
  <EditPageWrapper
  name="Tour"
  :store="store"
  :routeData="routeData"
  :linksList="linksList">

  <TourMain />
  
  <template #helper="{ tab }">  
    <component :is="getTabComponent(tab)" />
  </template>

</EditPageWrapper>
</template>

<script setup>
import { useTourStore } from 'src/modules/tours/TourStore';
import EditPageWrapper from 'src/components/wrappers/EditPageWrapper.vue';
import TourMain from './edit/TourMain.vue';
import TourStops from './edit/TourStops.vue';
import TourMap from './edit/TourMap.vue';
import TourPrint from './edit/TourPrint.vue';

const store = useTourStore()
const routeData = {
    param_id: 'tour_id',
    back_root: 'home'
}

const linksList = [{
  title: 'Stops',
  icon: 'cottage'
}, {
  title: 'Map',
  icon: 'map'
}, {
  title: 'Print',
  icon: 'get_app'
}]

function getTabComponent(tab) {
  switch (tab) {
    case 'Stops': return TourStops
    case 'Map': return TourMap
    case 'Print': return TourPrint
    default: return null
  }
}
</script>
