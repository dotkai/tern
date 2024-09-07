<template>
<q-page>
  <div class="row justify-between q-ma-md">
    <q-input filled v-model="filter" label="Filter">
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>
    <ImageAddGalleryInput :postupload="init" />
  </div>

  <q-separator />

  <section>
    <EmptyContentBlock v-if="!gallery.length" label="No Images" icon="image" />

    <div class="row wrap justify-around q-mx-md">
      <ImageGalleryCard 
        class="q-ma-sm hover"
        v-for="item in gallery" 
        :key="item._id"
        v-bind="item"
        @onupdate="v => updateGalleryItem(item, v)"
        @onremove="removeImage"
        />
    </div>
  </section>
</q-page>
</template>

<script setup>
import {ref} from 'vue'
import { NotifyService } from 'src/services';
import { Database } from 'src/db/db';
import EmptyContentBlock from 'src/components/space_holders/EmptyContentBlock.vue';
import ImageGalleryCard from 'src/modules/images/gallery/ImageGalleryCard.vue';
import ImageAddGalleryInput from '../../modules/images/gallery/ImageAddGalleryInput.vue';

const Images = new Database('image_files')
const message = new NotifyService('Image')

const filter = ref(null)
const gallery = ref([])

  init()

function init(){
  Images.getAll()
  .then(data => {
    gallery.value = data
  })
  .catch(e => message.error(e))
}

function updateGalleryItem(item, nu){
  item.name = nu.name
  item.tags = nu.tags
}

function removeImage(_id){
  gallery.value = gallery.value.filter(item => item._id !== _id)
}
</script>