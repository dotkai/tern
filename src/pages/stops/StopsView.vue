<template>
<q-page>
  <ViewOptionBar :addlink="{ name: 'edit_stop', params: { stop_id: 'NEW' } }" />

  <q-table
    title="All Stops"
    :rows="rows"
    :columns="columns"
    row-key="_id"
    @row-click="(evt, row) => $router.push({ name: 'edit_stop', params: { stop_id: row._id } })"
  />
</q-page>
</template>

<script setup>
import { ref } from 'vue';
import ViewOptionBar from 'src/components/bars/ViewOptionBar.vue';


const columns = [
  { name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true },
  { name: 'location', label: 'Location', field: 'locations', align: 'left', sortable: true }
]
const rows = ref([])

  // mounted(){
  //   this.$api.get(`/management/stops`)
  //     .then(v => this.rows = v.data)
  //     .catch(err => this.$root.$error(err))
  // }

</script>
