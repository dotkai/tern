<template>
<q-page>
  <ViewOptionBar :addlink="{ name: 'edit_location', params: { location_id: 'NEW' } }"
    v-model:filter="filter" />

  <q-table
    title="All Locations"
    :rows="displayRows"
    :columns="columns"
    row-key="_id"
    @row-click="(evt, row) => $router.push({ name: 'edit_location', params: { location_id: row._id } })">

    <template #body-cell-image="props">
      <q-td :props="props" style="width:70px">
        <ImageWrapper
          :filename="props.row.images[0].path"
          style="border-radius: 4px;width: 64px; height: 64px;"/>
      </q-td>
    </template>

    <template #body-cell-address="props">
      <q-td :props="props">
        <span v-if="props.row.maptype === 'ADDRESS'">
          {{ props.row.address }}
        </span>
        <span v-else class="text-grey">-</span>
      </q-td>
    </template>
    
    <template #body-cell-coords="props">
      <q-td :props="props">
        <span v-if="props.row.maptype === 'COORD' && isValidCoords(props.row.coords)">
          Lat: {{ parseFloat(props.row.coords.lat).toFixed(2) }},
          Lng: {{ parseFloat(props.row.coords.lon).toFixed(2) }}
        </span>
        <span v-else class="text-grey">-</span>
      </q-td>
    </template>

    <template #body-cell-tags="props">
      <q-td :props="props">
        <q-chip
          v-for="tag in props.row.tags"
          :key="tag"
          dense
          color="grey"
          text-color="white"
          class="q-mr-xs q-mb-xs"
        >
          {{ tag }}
        </q-chip>
      </q-td>
    </template>
  
  </q-table>
</q-page>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { Database } from 'src/db/db';
import { NotifyService } from 'src/services';
import ViewOptionBar from 'src/components/bars/ViewOptionBar.vue';
import ImageWrapper from 'src/components/wrappers/ImageWrapper.vue';

const LocationData = new Database('locations')
const message = new NotifyService('Location')

const columns = [
  { name: 'image', label: 'Image', field: 'images', align: 'left' },
  { name: 'name', label: 'Name', field: 'name', align: 'left',sortable: true },
  { name: 'address', label: 'Address', field: 'address', align: 'left',sortable: true },
  { name: 'coords', label: 'Coordinates', field: 'coords', align: 'left',sortable: true },
  { name: 'tags', label: 'Tags', field: 'tags', align: 'left' }
]
const rows = ref([])
const filter = ref('')

const displayRows = computed(() => {
  const keyword = filter.value?.toLowerCase().trim()
  if (!keyword) return rows.value

  return rows.value.filter(item => {
    const nameMatch = item.name?.toLowerCase().includes(keyword)
    const addressMatch = item.address?.toLowerCase().includes(keyword)
    const tagsMatch = Array.isArray(item.tags)
      ? item.tags.some(tag => tag.toLowerCase().includes(keyword))
      : false

    return nameMatch || addressMatch || tagsMatch
  })
})

onMounted(async () => {
  try{
    const data = await LocationData.getAll()
    rows.value = data
  } catch(e){
    message.error(e)
  }

})

function isValidCoords(coords) {
  return coords &&
    !isNaN(parseFloat(coords.lat)) &&
    !isNaN(parseFloat(coords.lon))
}
</script>
