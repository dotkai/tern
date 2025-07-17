<template>
<q-page class="column">
  <EditMenuBar :pageName="`Edit ${name}`" 
    :returnto="route.getBackTarget()"
    @submit="submit"
    @remove="confirmRemove" />
  
  <div>
    <q-splitter
      v-model="splitterModel"
      :limits="[50, 100]"
    >

      <template v-slot:before>
        <div class="q-pa-lg">
          <slot></slot>
        </div>
      </template>

      <template v-slot:after>
        <div>
          <q-tabs
            v-model="tab"
            class="text-grey"
          >
            <q-tab v-for="link in linksList" 
              :key="link.title"
              :name="link.title"
              :icon="link.icon"  />
          </q-tabs>
          <div class="q-pa-sm">
            <slot :tab="tab" name="helper"></slot>
          </div>
        </div>
      </template>

    </q-splitter>
  </div>
</q-page>
</template>

<script setup>
import {ref } from 'vue';
  import { RouteService, NotifyService } from 'src/services';
  import EditMenuBar from 'src/components/bars/EditMenuBar.vue';

  const props = defineProps({
    name: String,
    linksList: Array,
    store: Object,
    routeData: Object
  })

  const route = new RouteService(props.routeData)
  const message = new NotifyService(props.name);
  const splitterModel = ref(50)
  const tab = ref(props.linksList[0].title)


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
    