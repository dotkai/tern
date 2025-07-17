<template>
<SortList
  showbase
  clickEdit
  :modelValue="transcripts"
  @update:modelValue="v => $emit('update:transcripts', v)"
  :displayList="displayStopList"
  @onedit="item => navstore.stashReturn($router, $route,
    { 
      name: 'edit_script', 
      params: { script_id: item._id } 
  })">

  <template #header="{ item }">
    <div class="flex align-center column q-pl-sm">
      <div class="text-subtitle2 q-pa-sm">{{item.name || item}}</div>
    </div>
  </template>
  <template #base="{ item }">
    <TextPreviewExpansion :text="item.text" :preview-length="80" />
  </template>

</SortList>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Database } from 'src/db/db';
import { useNavigationStore } from 'src/modules/navigation/NavigationStore';
import SortList from 'src/components/lists/SortList.vue';
import TextPreviewExpansion from 'src/components/wrappers/TextPreviewExpansion.vue';

const props = defineProps({
  transcripts: Array
})

const ScriptData = new Database('transcripts')
const navstore = useNavigationStore()
const allScriptList = ref([])

const displayStopList = computed(() => {
    if(!props.transcripts) return []
    return props.transcripts.map(key => {
      return allScriptList.value.find(v => key === v._id)
    }).filter(v => v)
  })

  onMounted(async () => {
  const data = await ScriptData.getAll()
  allScriptList.value = data
})
</script>