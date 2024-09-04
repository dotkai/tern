<template>
<q-page>
  <ViewOptionBar :addlink="{ name: 'edit_location', params: { location_id: 'NEW' } }" />

  <q-table
    title="All Locations"
    :rows="rows"
    :columns="columns"
    row-key="_id"
    @row-click="(evt, row) => $router.push({ name: 'edit_location', params: { location_id: row._id } })"
  />
</q-page>
</template>

<script setup>
import { ref } from 'vue';
import { Database } from 'src/db/db';
import { NotifyService } from 'src/services';
import ViewOptionBar from 'src/components/bars/ViewOptionBar.vue';

const LocationData = new Database('locations')
const message = new NotifyService('Location')

const columns = [
        { name: 'name', label: 'Name', field: 'name', align: 'left',sortable: true },
        { name: 'neighborhood', label: 'Neighborhood', field: 'neighborhood', align: 'left',sortable: true },
        { name: 'address', label: 'Address', field: 'address', align: 'left',sortable: true },
        { name: 'lat', label: 'Latitutde', field: 'lat', align: 'left',sortable: true },
        { name: 'long', label: 'Longditude', field: 'long', align: 'left',sortable: true }
      ]
const rows = ref([])

init()

async function init(){
  try{
    const data = await LocationData.getAll()
    rows.value = data
  } catch(e){
    message.error(e)
  }
}

</script>
