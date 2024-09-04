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
import { ref } from 'vue';

const columns = [
  { name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true },
  { name: 'toedit', label: 'To Edit', field: 'toedit', align: 'left', sortable: true },
  { name: 'complete', label: 'Complete', field: 'complete', align: 'left', sortable: true }
]
const rows = ref([])


//   mounted(){
//     this.$api.get(`/management/scripts`)
//       .then(v => this.rows = v.data)
//       .catch(err => this.$root.$error(err))
//   }
// }

</script>
