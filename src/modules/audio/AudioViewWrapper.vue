<template>
<section>
    <div>      
        <AudioAddInput :postupload="insertAudio" />
    </div>
    <q-separator class="q-my-md" />
    
    <EmptyContentBlock v-if="!audio.length" label="No Audio" icon="mic" />
    <SortList 
        audio
        click-edit
        :displayList="audio"
        :modelValue="audio"
        @update:modelValue="v => $emit('update:audio', v)"
        />
</section>
</template>

<script setup>
import { ref } from 'vue';
import AudioAddInput from './gallery/AudioAddInput.vue';
import EmptyContentBlock from 'src/components/space_holders/EmptyContentBlock.vue';
import SortList from 'src/components/forms/SortList.vue';
import { Database } from 'src/db/db';

const AudioData = new Database('audio_files')
const props = defineProps({
    audio: Array
})
const emit = defineEmits(['update:audio'])

const fileAdd = ref([])

async function insertAudio(idlist){
    // Get audio added and tack on stores
    const audio = await AudioData.getSet(idlist)
    const updated = [...props.audio, ...audio.map(a => {
        console.log(a)
        return {
            audio_id: a._id,
            path: a.path,
            name: a.name,
            caption: null
        }
    })]
    emit('update:audio', updated)
}
</script>