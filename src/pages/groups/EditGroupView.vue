<template>
<q-page class="column">
  <EditMenuBar pageName="Edit Group" :returnto="{ name: 'groups' }"
    @remove="confirmRemove"
    @submit="saveGroup" />

  <div class="q-pa-lg">
    <LabelWrapper name="Name">
        <q-input class="col" filled v-model="name" />
    </LabelWrapper>
    <LabelWrapper name="List">
        <div class="col">
            <div class="row justify-between">
                <div class="row">
                    <q-input dense filled v-model="addItemValue" />
                    <q-btn flat label="Add" icon="vertical_align_bottom" @click="insertNewListItem" />
                </div>
                <div>
                    <span class="text-subtitle2 q-pr-md">Quick Sort:</span>
                    <q-btn round flat icon="sort_by_alpha" @click="sortAlpha" />
                    <q-btn round flat icon="undo" @click="undoSort"
                        :disabled="!prevSort" />
                </div>
            </div>
            <q-separator class="q-ma-md" />
            <EmptyContentBlock v-if="!updateList.length" label="No List Items" icon="list" />
            <SortList 
                v-model="updateList"
                :displayList="updateList" />
        </div>
    </LabelWrapper>
  </div>

</q-page>
</template>

<script setup>
import {ref} from 'vue'
import {Database} from 'src/db/db';
import {NotifyService, RouteService} from 'src/services'
import EmptyContentBlock from 'src/components/space_holders/EmptyContentBlock.vue';
import EditMenuBar from 'src/components/bars/EditMenuBar.vue';
import LabelWrapper from 'src/components/wrappers/LabelWrapper.vue';
import SortList from 'src/components/forms/SortList.vue';

const GroupData = new Database('groups')
const message = new NotifyService('Group')
const router = new  RouteService({
    param_id: 'group_id',
    back: 'groups'
})

// Page management stuff
const GROUP_ID = router.getEditId();
const addItemValue = ref(null)
const prevSort = ref(null)

// Data
const name = ref(null)
const updateList = ref([])

GroupData.getOne(GROUP_ID)
.then(data => {
    name.value = data.name;
    updateList.value = data.list;
}).catch(err => {
    message.error(err)
})

// Form Functions
function insertNewListItem(){
    if(!addItemValue.value) return;
    updateList.value.push(GroupData.createSub({
        name: addItemValue.value
    }))
    addItemValue.value = null;
    prevSort.value = null;
}

function sortAlpha(){
    if(!prevSort.value) prevSort.value = JSON.parse(JSON.stringify(updateList.value))
    updateList.value.sort((a,b) => {
        if(a.name > b.name) return 1;
        if(a.name < b.name) return -1;
        return 0;
    })
}

function undoSort(){
    updateList.value = prevSort.value;
    prevSort.value = null;
}

// Data Buttons
async function saveGroup(){
    const data = {
        name: name.value,
        list: JSON.parse(JSON.stringify(updateList.value))
    }
    try {
        if(!router.isnu()){
            await GroupData.update(GROUP_ID, data)
            message.update(name.value)
            return;
        }
        await GroupData.add(data)
        message.add(name.value)
        router.back()
    } catch(e){
        message.error(null, e)
    }
}

function confirmRemove(){
    
}

</script>