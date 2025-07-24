<template>
<section>
    <PickerBlock 
    label="Select Stops"
    icon="cottage"
    v-model="store.stops"
    :stopOptionList="stopOptionList"
    :addRoute="{ name: 'edit_stop', params: { stop_id: 'NEW' } }" />

    <SortList
        click-edit
        v-model="store.stops"
        :displayList="displayStopList"
        @onedit="item => navstore.stashReturn($router, $route,
            { 
            name: 'edit_stop', 
            params: { stop_id: item._id } 
        })">

        <template #header="{item}">
          <div class="row col">
              <ImageWrapper
                  :filename="item.images[0]?.path"
                  />
              <div class="col q-py-md">
                  <div class=" text-subtitle2">{{ item.name }}</div>
                  <div>
                    <q-icon name="pin_drop" />
                    <span>{{ item.locations.map(v => v.name).join(',') }}</span>
                  </div>
              </div>
            </div>
        </template>
    </SortList>
</section>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useTourStore } from 'src/modules/tours/TourStore';
import PickerBlock from 'src/components/forms/PickerBlock.vue';
import { Database } from 'src/db/db';
import { NotifyService } from 'src/services';
import SortList from 'src/components/lists/SortList.vue';
import { useNavigationStore } from 'src/modules/navigation/NavigationStore';
import ImageWrapper from 'src/components/wrappers/ImageWrapper.vue';

const store = useTourStore()
const StoreData = new Database('stories')
const message = new NotifyService()
const navstore = useNavigationStore()

const stopOptionList = ref([])
const displayStopList = computed(() => {
    return store.stops.map(key => {
      return stopOptionList.value.find(v => key === v._id)
    }).filter(v => v)
  })


onMounted(async () => {
    try {
        stopOptionList.value = await StoreData.getAllFilled(['locations'])
    } catch(e){
        message.error(e)
    }
})
</script>