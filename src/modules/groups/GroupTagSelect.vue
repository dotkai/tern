<template>
<div>
    <LabelWrapper name="Tags">
        <div class="col">
            <SelectItem 
            label="Group"
            :options="groupList"
            :selected="group"
            @update:selected="updateGroup"
            @clear="$emit('update:tags', [])" />
            
            <q-separator/>

            <div v-if="!group" class="text-caption self-center">
                (Select Group)
            </div>
            <SelectItem 
                v-if="group"
                multiple
                :options="tagList"
                :selected="tags"
                @update:selected="v => $emit('update:tags', v)" />
        </div>
    </LabelWrapper>
</div>
</template>

<script setup>
import {computed, ref, watch} from 'vue'
import { Database } from 'src/db/db';
import {NotifyService} from 'src/services'
import LabelWrapper from 'src/components/wrappers/LabelWrapper.vue';
import SelectItem from 'src/components/forms/SelectItem.vue';

const props = defineProps({
    group: String,
    tags: Array
})
const emit = defineEmits(['update:group', 'update:tags'])


// Management
const GroupData = new Database('groups') 
const message = new NotifyService('Group')

// Refs
const groupList = ref([])
const tagList = computed(_ => {
    let temp = groupList.value.find(v => {
        if(v._id === props.group) return v.list
    })
    return temp? temp.list : [];
})

// INIT DATA STUFF
GroupData.getAll()
    .then(data => {
        groupList.value = data
    }).catch(err => {
        message.error(err)
    })


// Form Functions
function updateGroup(v){
    emit('update:group', v)
    emit('update:tags', [])
}
</script>