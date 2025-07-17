<template>
<section>
    <div class="row justify-between">
        <FilterInput 
            v-model="filter" />
        <FindSelectImageButton 
            :images="images"
            @update:images="v => $emit('update:images', v)" />
    </div>
    
    <q-separator class="q-my-md" />
    <EmptyContentBlock v-if="!images.length" label="No Images" icon="image" />

    <SortList 
        click-edit
        :modelValue="images"
        @update:modelValue="v => $emit('update:images', v)"
        :displayList="displayList"
        @onedit="openEdit"
    >
        <template #header="{item}">
          <div class="row col">
          <ImageWrapper
              :path="item.path"
              />
          <div class="col q-py-md">
              <div class=" text-subtitle2">{{ item.name }}</div>
              <div v-if="item.caption">{{ item.caption }}</div>
          </div>
        </div>
        </template>
    </SortList>

  <MaxMinDialog
    v-model="editDialog">
    <SelectedImageEditDialogContent
      v-bind="editTarget"
      @setimage="updateImage"
      @remove="removeImage" />
  </MaxMinDialog>
</section>
</template>

<script setup>
import { computed, ref } from 'vue'
import FindSelectImageButton from 'src/modules/images/FindSelectImageButton.vue';
import SortList from 'src/components/lists/SortList.vue';
import EmptyContentBlock from 'src/components/space_holders/EmptyContentBlock.vue';
import SelectedImageEditDialogContent from 'src/modules/images/SelectedImageEditDialogContent.vue';
import FilterInput from 'src/components/forms/FilterInput.vue';
import ImageWrapper from 'src/components/wrappers/ImageWrapper.vue';
import MaxMinDialog from 'src/components/dialogs/MaxMinDialog.vue';

const props = defineProps({
    images: Array
})
const emit = defineEmits(['update:images'])

const filter = ref('')
const editDialog = ref(false)
const editTarget = ref({})

const displayList = computed(() => {
  return props.images.filter(v => {
    return (v.name || '').includes(filter.value) 
      || (v.caption || '').includes(filter.value)
  })
})

function openEdit(item){
    editDialog.value = true
    editTarget.value = item
}
function updateImage(nu){
  const target = props.images[editTarget.value.index]
  // Modify object directlu
  target.name = nu.name;
  target.caption = nu.caption;
}
function removeImage(id){
  emit('update:images', props.images.toSpliced(index, 1))
}
</script>