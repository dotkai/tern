<template>
<q-page>
    <ViewOptionBar :addlink="{ name: 'edit_group', params: { group_id: 'NEW' } }" />
    <q-separator />
    <EmptyContentBlock v-if="!groupList.length" 
        label="No Tag Groups" icon="sell" />
    
    <div class="row text-subtitle2">
        <div class="col-4 q-pa-md">Group Name</div>
        <div class="q-pa-md">
            <q-icon name="preview" color="indigo-3" size="1.5em" left />
            <span>Preview</span>
        </div>
    </div>
    <q-card v-for="group in groupList" :key="group._id">
      <div
        class="row items-center q-pa-sm hover"
        @click="$router.push({ name: 'edit_group', params: { group_id: group._id } })"
      >
        <div class="col-4 text-subtitle-1 q-px-md">
        {{ group.name }}
        </div>

        <div
        class="col"
        @click.stop
        >
        <q-select
            label="Tags"
            :model-value="dud"
            :options="group.list"
            option-value="_id"
            option-label="name"
            dense
            outlined
            emit-value
            map-options
        />
        </div>
      </div>
    </q-card>
</q-page>
</template>

<script setup>
import {ref, computed} from 'vue'
import {Database} from 'src/db/db.js';
import ViewOptionBar from 'src/components/bars/ViewOptionBar.vue';
import EmptyContentBlock from 'src/components/space_holders/EmptyContentBlock.vue';
import { NotifyService } from 'src/services';

const GroupData = new Database('groups')
const message = new NotifyService('Group')
const groupList = ref([])
const dud = ref(null)   // 

GroupData.getAll().then(data => {
    groupList.value = data
}).catch(err => message.error(err))
</script>
    