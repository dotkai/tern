<template>
<section>
    <NoteEditDialog
        v-model="dialog"
        v-model:text="activeNote.text"
        @remove="removeNote(activeNote)" />

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

    <EmptyContentBlock v-if="!store.notes.length" label="No Notes" icon="note" />
    <NoteCard v-for="note in store.notes" :key="note.created"
        :updated="note.updated"
        :text="note.text"
        class="hover"
        @click="editNote(note)" />
</section>
</template>

<script setup>
import FilterInput from 'src/components/forms/FilterInput.vue';
import NoteCard from 'src/modules/transcripts/NoteCard.vue';
import NoteEditDialog from 'src/modules/transcripts/NoteEditDialog.vue';
import EmptyContentBlock from 'src/components/space_holders/EmptyContentBlock.vue';
import { useScriptStore } from 'src/modules/transcripts/ScriptStore';
import { ref } from 'vue';

const store = useScriptStore()
const dialog = ref(null)
const filter = ref(null)
const activeNote = ref({})


function addNote(){
    let nu = {
        created: new Date().getTime(),
        updated: new Date().getTime()
    }
    activeNote.value = nu
    store.notes.push(nu)
    dialog.value = true;
}

function editNote(note){
    activeNote.value = note
    dialog.value = true
}

function removeNote(activeNote){
    store.notes = store.notes.filter(v => v.created !== activeNote.created)
}
</script>