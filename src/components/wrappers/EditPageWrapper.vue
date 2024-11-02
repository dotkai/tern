<template>
<q-page class="column">
  <EditMenuBar :pageName="`Edit ${name}`" 
    :returnto="route.getBackTarget()"
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


    console.log(props.store)
  props.store.init(route.getEditId(), message)

  async function submit(){
    try {
      await props.store.update()
      message.update(props.store.name || '(Unnamed)')
    } catch(e){
      message.error(e)
    }
  }

  async function confirmRemove(){
    try {
      await props.store.remove()
      message.remove(props.store.name || '(Unnamed)')
      route.back()
    } catch(e){
      message.error(e)
    }
  }
</script>
    