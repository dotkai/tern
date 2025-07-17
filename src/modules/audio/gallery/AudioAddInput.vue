<template>
<div class="row col q-ml-md">      
    <q-file class="col" 
    dense
    multiple 
    filled 
    clearable
    v-model="fileAdd" 
    label="Select or Drag/Drop Audio"
    accept="audio/*">
    <template v-slot:prepend>
        <q-icon name="library_music" />
    </template>
    </q-file>
    <q-btn flat label="Add" icon="vertical_align_bottom" @click="uploadAudio" />
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
const message = new NotifyService()
const Audio = new Database('audio_files')
const fileAdd = ref([])

async function uploadAudio(){
    // Transfer images to filesystem
    const promise = fileAdd.value.map(file => {
    return fs.copyFile(file, nanoid(), 'audio_files')
    })

    const results = await Promise.all(promise)
    const dbcontent = results.map(item => {
    return Audio.add({
        _id: item.generatedId,
        name: item.originalName,
        path: item.savedName
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
