<template>
<BatchSelectMediaDialog>
    <div>
        <div class="row justify-between q-pa-md">
            <FilterInput v-model:filter="filter" />
            <AudioAddInput :postupload="init" />
            <div>
                <q-btn class="q-mx-md" flat label="Cancel" v-close-popup
                    @click="selected = []" />
                <q-btn outline color="primary" label="Insert" icon="vertical_align_bottom" v-close-popup
                    @click="insert" />
            </div>
        </div>
        <q-separator />
        <div class="row justify-around">
            <AudioCard 
            class="q-mb-sm hover"
            :class="{ 'selected': selected.includes(audio._id) }"
            v-for="audio in gallery"
            :key="audio._id"
            v-bind="audio"
            @click="toggle(audio)" 
            />
        </div>
    </div>
</BatchSelectMediaDialog>
</template>

<script setup>
import { ref } from 'vue';
import _ from 'lodash'
import { NotifyService } from 'src/services';
import { Database } from 'src/db/db';
import BatchSelectMediaDialog from 'src/components/dialogs/BatchSelectMediaDialog.vue';
import FilterInput from 'src/components/forms/FilterInput.vue';
import AudioCard from './AudioCard.vue';
import AudioAddInput from './gallery/AudioAddInput.vue';

const props = defineProps({
    audio: Array
})
const emit = defineEmits(['update:audio'])

const Images = new Database('audio_files')
const message = new NotifyService('Audio')
const filter = ref('')
const gallery = ref([])
const selected = ref([])

init()

async function init(){
    try {
        const list = await Images.getAll()
        gallery.value = list
    } catch(e){
        message.error(e)
    }
}

function toggle(audio){
    if(selected.value.includes(audio._id)){
        selected.value = _.pull(selected.value, audio._id)
        return;
    }
    selected.value.push(audio._id)
}

function insert(){
    let audioList = selected.value.map(audio_id => {
        let audio = gallery.value.find(v => v._id === audio_id)
        return {
            audio_id,
            path: audio.path,
            name: audio.name,
            caption: null
        }
    })
    emit('update:audio', [...(props.audio || []), ...audioList])
    selected.value = []
}

</script>

<style lang="scss">
.selected {
    border: 10px dashed $primary;
}
</style>