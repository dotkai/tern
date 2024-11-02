<template>
<section>
    <LabelWrapper name="Stops">
      <PickerBlock 
        v-model="store.stops"
        :stopOptionList="stopOptionList"
        :addRoute="{ name: 'edit_stop', params: { stop_id: 'NEW' } }" />
    </LabelWrapper>
</section>
</template>

<script setup>
import { ref } from 'vue';
import { useTourStore } from 'src/modules/tours/TourStore';
import LabelWrapper from 'src/components/wrappers/LabelWrapper.vue';
import PickerBlock from 'src/components/forms/PickerBlock.vue';
import { Database } from 'src/db/db';
import { NotifyService } from 'src/services';

const store = useTourStore()
const StoreData = new Database('stories')
const message = new NotifyService()

const stopOptionList = ref([])

init()

async function init(){
    try {
        stopOptionList.value = await StoreData.getAll()
    } catch(e){
        message.error(e)
    }
}
</script>