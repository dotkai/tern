<template>
<section>
    <FindSelectImageButton 
        v-model:images="store.images" />
    <q-separator class="q-my-md" />
    <SortList 
        image
        caption
        click-edit
        v-model="store.images"
        :displayList="store.images"
        @onedit="openEdit"
        />

    <SelectedImageEditDialog
        v-model="editDialog"
        v-bind="editTarget"
        v-model:images="store.images" />
</section>
</template>

<script setup>
import { ref } from 'vue'
import { useLocationStore } from 'src/modules/location/LocationStore';
import FindSelectImageButton from 'src/modules/images/FindSelectImageButton.vue';
import SortList from 'src/components/forms/SortList.vue';
import SelectedImageEditDialog from 'src/modules/images/SelectedImageEditDialog.vue';

const store = useLocationStore()
const editDialog = ref(false)
const editTarget = ref({})

function openEdit(item){
    editDialog.value = true
    editTarget.value = item
}
</script>