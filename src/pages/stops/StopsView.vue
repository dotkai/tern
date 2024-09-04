<template>
<q-page>
  <div class="row justify-end q-ma-md">
    <q-btn label="Add" icon="add" color="primary" :to="{ name: 'edit_stop', params: { stop_id: 'NEW' } }" />
  </div>
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


const columns = [
  { name: '_id', label: '_id', field: '_id', align: 'left', sortable: true },
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
