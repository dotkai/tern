<template>
<SortList
  showbase
  clickEdit
  :modelValue="location"
  @update:modelValue="v => $emit('update:location', v)"
  :displayList="displayStopList"
  @onedit="item => navstore.stashReturn($router, $route,
    { 
      name: 'edit_location', 
      params: { location_id: item._id } 
  })">

  <template #header="{ item }">
    <div class="flex align-center column q-pl-sm">
      <div class=" text-subtitle2">{{item.name || item}}</div>
      <LocationDisplay 
        :maptype="item.maptype"
        :address="item.address" 
        :coords="item.coords" />
    </div>
  </template>
  <template #base="{ item }">
    <MapOneView :maptype="item.maptype" :address="item.address" :coords="item.coords" />
  </template>

</SortList>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Database } from 'src/db/db';
import { useNavigationStore } from 'src/modules/navigation/NavigationStore';
import SortList from 'src/components/lists/SortList.vue';
import MapOneView from './MapOneView.vue';
import LocationDisplay from './_LocationDisplay.vue';

const props = defineProps({
  location: Array
})

const LocationData = new Database('locations')
const navstore = useNavigationStore()
const allLocationList = ref([])

const displayStopList = computed(() => {
    if(!props.location) return []
    return props.location.map(key => {
      return allLocationList.value.find(v => key === v._id)
    }).filter(v => v)
  })

  onMounted(async () => {
  const data = await LocationData.getAll()
  allLocationList.value = data
})
</script>