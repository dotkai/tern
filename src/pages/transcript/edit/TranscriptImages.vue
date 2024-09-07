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
        v-model:images="store.images"
        v-bind="editTarget" />
</section>
</template>

<script setup>
import { ref } from 'vue'
import { useScriptStore } from 'src/modules/transcripts/ScriptStore';
import FindSelectImageButton from 'src/modules/images/FindSelectImageButton.vue';
import SortList from 'src/components/forms/SortList.vue';
import SelectedImageEditDialog from 'src/modules/images/SelectedImageEditDialog.vue';

const store = useScriptStore()
const editDialog = ref(false)
const editTarget = ref({})

function openEdit(item){
    editDialog.value = true
    editTarget.value = item
}
</script>