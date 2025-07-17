<template>
<q-page>
  <ViewOptionBar 
    :addlink="{ name: 'edit_tour', params: { tour_id: 'NEW' } }" />
  
  <q-separator />

  <EmptyContentBlock v-if="!rows.length" label="No Tours" icon="tour" />
  <section class="row">
    <q-card class="my-card col-5"
      v-for="row in rows"
      :key="row._id"
      @click="$router.push({ name: 'edit_tour', params: { tour_id: row._id } })">
      <div style="position: relative;">
        <q-img 
          v-if="row.cover_image_path"
          :src="'/image_files/'+row.cover_image_path" 
          height="250px"
          error-src="util_images/noimage.png"></q-img>        
        <div
          v-else
          class="bg-grey-4 row justify-center items-center"     
          style="height: 250px;">
          <q-icon name="image" size="lg" color="grey-6"/>
        </div>
        
        <div class="card-title absolute-bottom text-h6">
          {{row.title || '(No Name)'}}
        </div>
      </div>
        
      <q-card-section v-if="row.brief">
        {{row.brief}}
      </q-card-section>
    </q-card>
  </section>
</q-page>
</template>

<script setup>
  import {ref} from 'vue'
  import {Database} from 'src/db/db.js'
  import ViewOptionBar from 'src/components/bars/ViewOptionBar.vue';
  import EmptyContentBlock from 'src/components/space_holders/EmptyContentBlock.vue';
import { NotifyService } from 'src/services';

  const TourData = new Database('tours')
  const message = new NotifyService()
  const rows = ref([])

  init()

  async function init(){
    try {
      rows.value = await TourData.getAll()
    } catch(e){
      message.error(e)
    }
  }

</script>

<style>
.my-card {
  margin: 10px;
}
.my-card .card-title {
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
}
.my-card:hover {
  cursor: pointer;
  opacity: 0.8;
}
</style>