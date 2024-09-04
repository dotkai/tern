<template>
<q-page class="column">
  <EditMenuBar pageName="Edit Location" :returnto="{ name: 'location' }"
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
  import EditMenuBar from 'src/components/bars/EditMenuBar.vue';
  import LinkList from 'src/components/wrappers/LinkList.vue';
import { useLocationStore } from 'src/modules/location/LocationStore';

  const router = new RouteService({
    param_id: 'location_id',
    back_root: 'location'
  })
  const store = useLocationStore()
  const message = new NotifyService('Location')

  const linksList = [{
    title: 'Home',
    to: { name: 'edit_location' }
  }, {
    title: 'Images',
    to: { name: 'edit_location_images' }
  }]

  // ********
  //  INIT
  // ********
  store.init(router.getEditId())


  // ********
  //  BUTTONS
  // ********
  async function submit(){
    try {
      if(!router.isnu()){
        await store.update()
        message.update(store.name)
        return;
      }
      const nuid = await store.add()
      message.add(store.name)
      router.upid(nuid)
    } catch(e){
      message.error(e)
    }
  }

  async function confirmRemove(){
    try {
      await store.remove()
      message.remove(store.name)
      router.back()
    } catch(e){
      message.error(e)
    }
  }
</script>
