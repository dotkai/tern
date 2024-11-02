<template>
  <EditPageWrapper
  name="Tour"
  :store="store"
  :routeData="routeData"
  :linksList="linksList" />
</template>

<script setup>
import { useTourStore } from 'src/modules/tours/TourStore';
import EditPageWrapper from 'src/components/wrappers/EditPageWrapper.vue';

const store = useTourStore()
const routeData = {
    param_id: 'tour_id',
    back_root: 'home'
}

const linksList = [{
  title: 'Home',
  to: { name: 'edit_tour' }
}, {
  title: 'Stops',
  to: { name: 'edit_tour_stops' }
}, {
  title: 'Compiled',
  to: { name: 'edit_tour_compiled' }
}]
</script>
