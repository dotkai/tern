<template>
<q-page>
  <ViewOptionBar 
    :addlink="{ name: 'edit_tour', params: { tour_id: 'NEW' } }" />
  
  <q-separator />

  <section>
    <EmptyContentBlock label="No Tours" icon="tour" />
    <q-card class="my-card"
      v-for="row in rows"
      :key="row._id"
      @click="$router.push({ name: 'edit_tour', params: { tour_id: row._id } })">
      <q-img :src="row.imgsrc" 
        error-src="util_images/noimage.png">
        <div class="absolute-bottom text-h6">
          {{row.title}}
        </div>
      </q-img>

      <q-card-section>
        {{ row }}
        {{row.brief}}
      </q-card-section>
    </q-card>
  </section>
</q-page>
</template>

<script setup>
  import {ref} from 'vue'
  import {db} from 'src/db/db.js'
  import ViewOptionBar from 'src/components/bars/ViewOptionBar.vue';
  import EmptyContentBlock from 'src/components/space_holders/EmptyContentBlock.vue';

  const filters = ref('')
  const rows = []//await db.tours

</script>

<style>
.my-card {
  display: inline-block;
  max-width: 250px;
  margin: 10px;
}
.my-card:hover {
  cursor: pointer;
  opacity: 0.8;
}
</style>