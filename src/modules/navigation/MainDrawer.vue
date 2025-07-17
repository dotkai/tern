<template>
<q-drawer
  :model-value="leftDrawerOpen"
  @update:model-value="v => $emit('update:leftDrawerOpen', v)"
  show-if-above
  bordered
  :width="200"
>
  <q-list>
    <q-item-label class="row justify-between">
      <q-btn round flat icon="menu_open" color="grey" @click="$emit('update:leftDrawerOpen', false)" />
      <q-btn round flat icon="help_outline" color="grey"  />
    </q-item-label>

    <q-separator/>
    <q-item-label header overline>Content</q-item-label>
    <LinkList :list="linksList"/>
    <q-separator/>
    <q-item-label header overline>Parts</q-item-label>
    <LinkList :list="partsList"/>   
    <q-separator/>
    <q-item-label header overline>Mangement</q-item-label>
    <LinkList :list="mangeList"/>
  </q-list>
</q-drawer>
</template>

<script setup>
import LinkList from 'src/components/lists/LinkList.vue';

defineProps({
  leftDrawerOpen: Boolean
})

const linksList = [
  {
    title: 'Tours',
    icon: 'tour',
    to: { name: 'home' }
  }, {
    title: 'Tour Stops',
    icon: 'cottage',
    to: { name: 'stops' }
  }]

const partsList = [{
  title: 'Scripts',
  icon: 'edit_note',
  to: { name: 'scripts' }
}, {
  title: 'Locations',
  icon: 'pin_drop',
  to: { name: 'location' }
}]
  
const mangeList = [{
    title: 'Image Files',
    icon: 'image',
    to: { name: 'images' }
  }, {
    title: 'Audio Files',
    icon: 'mic',
    to: { name: 'audio' }
  }, 
  // {
  //   title: 'Groups',
  //   icon: 'label',
  //   to: { name: 'groups' }
  // }
]
</script>