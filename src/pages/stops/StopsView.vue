<template>
<q-page>
  <ViewOptionBar :addlink="{ name: 'edit_stop', params: { stop_id: 'NEW' } }"
    v-model:filter="filter" />

  <q-table
    title="All Stops"
    :rows="displayRows"
    :columns="columns"
    row-key="_id"
    @row-click="(evt, row) => $router.push({ name: 'edit_stop', params: { stop_id: row._id } })">

    <template #body-cell-image="props">
      <q-td :props="props">
        <div style="width: 64px; height: 64px;">
          <q-img
            v-if="props.row.images?.[0]?.path"
            :src="'/image_files/' + props.row.images[0].path"
            :ratio="1"
            style="border-radius: 4px;"
            spinner-color="grey-5"
          />
          <div
            v-else
            class="bg-grey-3"
            style="width: 100%; height: 100%; border-radius: 4px;"
          />
        </div>
      </q-td>
    </template>

    <template #body-cell-locations="props">
      <q-td :props="props">
        <div v-if="Array.isArray(props.row.locations)">
          {{ props.row.locations.map(v => v.name).join(',') }}
        </div>
        <div v-else class="text-grey">No locations</div>
      </q-td>
    </template>

    <template #body-cell-tags="props">
      <TableChipCol :props="props" />
    </template>
  </q-table>
</q-page>
</template>

<script setup>
import { ref, computed } from 'vue';
import _ from 'lodash';
import ViewOptionBar from 'src/components/bars/ViewOptionBar.vue';
import TableChipCol from 'src/components/table/TableChipCol.vue';
import { Database } from 'src/db/db';
import { NotifyService } from 'src/services';

const StoryData = new Database('stories')
const message = new NotifyService('Stops')

const columns = [
  { name: 'image', label: 'Image', field: 'images', align: 'left' },
  { name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true },
  { name: 'locations', label: 'Location', field: 'locations', align: 'left' },
  { name: 'tags', label: 'Tags', field: 'tags', align: 'left' }
]
const rows = ref([])
const filter = ref('')

const displayRows = computed(() => {
  const keyword = filter.value?.toLowerCase().trim()
  if (!keyword) return rows.value

  return rows.value.filter(item => {
    const nameMatch = item.name?.toLowerCase().includes(keyword)
    const tagsMatch = Array.isArray(item.tags)
      ? item.tags.some(tag => tag.toLowerCase().includes(keyword))
      : false

    return nameMatch || tagsMatch
  })

})

init()

async function init(){
  try{
    const data = await StoryData.getAllFilled(['locations'])
    rows.value = _.cloneDeep(data)
  } catch(e){
    message.error(e)
  }
}

</script>
