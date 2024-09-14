<template>
<section>
    <div class="row">
        <FindSelectImageButton 
            :images="images"
            @update:modelValue="v => $emit('update:images', v)" />
        <ImageAddGalleryInput :postupload="insertImages" />
    </div>
    <q-separator class="q-my-md" />
    <EmptyContentBlock v-if="!images.length" label="No Images" icon="image" />

    <SortList 
        image
        caption
        click-edit
        :modelValue="images"
        @update:modelValue="v => $emit('update:images', v)"
        :displayList="images"
        @onedit="openEdit"
        />

    <SelectedImageEditDialog
        v-model="editDialog"
        v-bind="editTarget"
        :images="images"
        @update:modelValue="v => $emit('update:images', v)"/>
</section>
</template>

<script setup>
import { ref } from 'vue'
import { Database } from 'src/db/db';
import FindSelectImageButton from 'src/modules/images/FindSelectImageButton.vue';
import SortList from 'src/components/forms/SortList.vue';
import SelectedImageEditDialog from 'src/modules/images/SelectedImageEditDialog.vue';
import ImageAddGalleryInput from 'src/modules/images/gallery/ImageAddGalleryInput.vue';
import EmptyContentBlock from 'src/components/space_holders/EmptyContentBlock.vue';

const ImageData = new Database('image_files')
const props = defineProps({
    images: Array
})
const emit = defineEmits(['update:images'])

const editDialog = ref(false)
const editTarget = ref({})

function openEdit(item){
    editDialog.value = true
    editTarget.value = item
}
async function insertImages(idList){
    // Get images added and tack on stores
    const images = await ImageData.getSet(idList)
    const updated = [...props.images, ...images.map(img => {
        return {
            image_id: img._id,
            path: img.path,
            name: img.name,
            caption: null
        }
    })]
    emit('update:images', updated)
}
</script>