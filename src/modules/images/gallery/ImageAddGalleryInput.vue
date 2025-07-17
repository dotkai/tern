<template>
<div class="row col q-ml-md">      
    <q-file class="col" 
    dense
    multiple 
    filled 
    clearable
    v-model="fileAdd" 
    label="Select or Drag/Drop"
    accept=".jpg, image/*">
    <template v-slot:prepend>
        <q-icon name="add_photo_alternate" />
    </template>
    </q-file>
    <q-btn flat label="Add" icon="vertical_align_bottom" @click="uploadImage" />
</div>
</template>

<script setup>
import {ref} from 'vue'
import { nanoid } from 'nanoid';
import { Database } from 'src/db/db';
import { NotifyService } from 'src/services';

const props = defineProps({
    postupload: Function
})

const fs = window.electronFs
const Images = new Database('image_files')
const message = new NotifyService()
const fileAdd = ref(null)

async function uploadImage(){
  // Transfer images to filesystem
  const promise = fileAdd.value.map(file => {
    return fs.copyFile(file, nanoid(), 'image_files')
  })

  const results = await Promise.all(promise)
  const dbcontent = results.map(item => {
    return Images.add({
      _id: item.generatedId,
      name: item.originalName,
      path: item.savedName,
      tags: []
    })
  })
  await Promise.all(dbcontent)
    .then(idList => {
        props.postupload(idList)
        fileAdd.value = null
    })
    .catch(e => message.error(e))
}

</script>