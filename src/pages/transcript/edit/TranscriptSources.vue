<template>
<section>
    <NoteEditDialog
        v-model="dialog"
        v-model:text="activeNote.text"
        @remove="removeSource(activeNote)" />

    <div class="row justify-between">
        <FilterInput v-model="filter" />
        <div>
            <q-btn outline 
                color="primary"
                label="Add" 
                icon="add"
                @click="addNote" />
        </div>
    </div>
    <q-separator class="q-my-md" />

    <EmptyContentBlock v-if="!store.sources.length" label="No Sources" icon="attribution" />
    
    <SortList
        click-edit
        v-model="store.sources"
        :displayList="displaySources"
        @onedit="editSource">
        <template #header="{ item }">
            <div v-html="item.text" class="q-pa-sm"></div>
        </template>
    </SortList>

</section>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useScriptStore } from 'src/modules/transcripts/ScriptStore';
import FilterInput from 'src/components/forms/FilterInput.vue';
import EmptyContentBlock from 'src/components/space_holders/EmptyContentBlock.vue';
import NoteEditDialog from 'src/modules/transcripts/NoteEditDialog.vue';
import SortList from 'src/components/lists/SortList.vue';

const store = useScriptStore()
const dialog = ref(null)
const filter = ref('')
const activeNote = ref({})


const displaySources = computed(() => {
    return store.sources.filter(v => {
        return v.text?.includes(filter.value)
    })
})


function addNote(){
    const nu = {
        created: new Date().getTime()
    };
    activeNote.value = nu;
    store.sources.push(nu)
    dialog.value = true;
}

function editSource(note){
    activeNote.value = note
    dialog.value = true
}

function removeSource(activeNote){
    store.sources = store.sources.filter(v => v.created !== activeNote.created)
}
</script>