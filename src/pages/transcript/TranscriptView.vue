<template>
<q-page>
  <ViewOptionBar :addlink="{ name: 'edit_script', params: { script_id: 'NEW' } }" />
  
  <q-table
    title="All Scripts"
    :rows="rows"
    :columns="columns"
    row-key="_id"
    @row-click="(evt, row) => $router.push({ name: 'edit_script', params: { script_id: row._id } })"
  />
</q-page>
</template>

<script setup>
import ViewOptionBar from 'src/components/bars/ViewOptionBar.vue';
import { Database } from 'src/db/db';
import { ref } from 'vue';

const ScriptData = new Database('transcripts')

const columns = [
  { name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true },
  { name: 'toedit', label: 'To Edit', field: 'toedit', align: 'left', sortable: true },
  { name: 'complete', label: 'Complete', field: 'complete', align: 'left', sortable: true }
]
const rows = ref([])


init()

async function init(){
  try{
    const data = await ScriptData.getAll()
    rows.value = data
  } catch(e){
    message.error(e)
  }
}

</script>
