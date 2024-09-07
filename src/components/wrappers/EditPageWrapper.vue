<template>
<q-page class="column">
  <EditMenuBar :pageName="`Edit ${name}`" 
    :returnto="{ name: routeData.back_root }"
    @submit="submit"
    @remove="confirmRemove" />
  
  <div class="row col">
    <div class="col-2 bg-grey-2">
      <LinkList :list="linksList"/>
    </div>
    <div class="q-pa-lg col">
      <router-view />
    </div>
  </div>
</q-page>
</template>

<script setup>
  import { RouteService, NotifyService } from 'src/services';
  import EditMenuBar from 'src/components/bars/EditMenuBar.vue'
  import LinkList from 'src/components/wrappers/LinkList.vue';

  const props = defineProps({
    name: String,
    linksList: Array,
    store: Object,
    routeData: Object
  })

  const route = new RouteService(props.routeData)
  const message = new NotifyService(props.name)

  props.store.init(route.getEditId())

  async function submit(){
    try {
      if(!route.isnu()){
        await props.store.update()
        message.update(store.name)
        return;
      }
      const nuid = await props.store.add()
      message.add(props.store.name)
      route.upid(nuid)
    } catch(e){
      message.error(e)
    }
  }

  async function confirmRemove(){
    try {
      await props.store.remove()
      message.remove(props.store.name)
      route.back()
    } catch(e){
      message.error(e)
    }
  }
</script>
    