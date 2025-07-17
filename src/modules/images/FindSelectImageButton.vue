<template>
<BatchSelectMediaDialog 
    type="image">
    <div>
        <div class="row justify-between q-pa-md">
            <FilterInput v-model:filter="filter" />
            <ImageAddGalleryInput :postupload="init" />
            <div>
                <q-btn class="q-mx-md" flat label="Cancel" v-close-popup
                    @click="selected = []" />
                <q-btn outline color="primary" label="Insert" icon="vertical_align_bottom" v-close-popup
                    @click="insert" />
            </div>
        </div>
        <q-separator />
        <div class="row justify-around">
            <ImageCard 
            class="q-mb-sm hover"
            :class="{ 'selected': selected.includes(img._id) }"
            v-for="img in gallery"
            :key="img._id"
            :name="img.name"
            :path="img.path"
            :tags="img.tags"
            @click="toggle(img)" 
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
import ImageCard from './ImageCard.vue';
import ImageAddGalleryInput from './gallery/ImageAddGalleryInput.vue';

const props = defineProps({
    images: Array
})
const emit = defineEmits(['update:images'])

const Images = new Database('image_files')
const message = new NotifyService('Images')
const filter = ref(null)
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

function toggle(image){
    if(selected.value.includes(image._id)){
        selected.value = _.pull(selected.value, image._id)
        return;
    }
    selected.value.push(image._id)
}

function insert(){
    let imageList = selected.value.map(image_id => {
        let img = gallery.value.find(v => v._id === image_id)
        return {
            image_id,
            path: img.path,
            name: img.name,
            caption: null
        }
    })
    emit('update:images', [...(props.images || []), ...imageList])
    selected.value = []
}

</script>

<style lang="scss">
.selected {
    border: 10px dashed $primary;
}
</style>