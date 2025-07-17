<template>
<CardList
	shownum
	:showbase="showbase"
	:list="displayList">
	<template #header="headerProps">
	  <div class="row tems-center sort-list-header">
			<div class="align-self-center col">
				<slot name="header" :item="headerProps" ></slot>
			</div>
			<div class="button-group">
				<q-btn v-if="clickEdit" round flat icon="edit" @click="$emit('onedit', headerProps)" />
				<q-btn round flat icon="arrow_downward" @click="moveDown(headerProps.index)"
					v-if="displayList.length > 1"
					class="button_down" 
					:class="{'hidden-btn': headerProps.index === displayList.length-1}" />
				<q-btn round flat icon="arrow_upward" @click="moveUp(headerProps.index)"
					v-if="displayList.length > 1"
					:class="{'hidden-btn': !headerProps.index}"  />
				<q-btn round flat icon="clear" @click="remove(headerProps.index)" />
			</div>
	  </div>
	</template>
	<template #base="baseProps">	
		<slot name="base" :item="baseProps" ></slot>	
	</template>
</CardList>
</template>

<script setup>
import CardList from './CardList.vue';

const props = defineProps({
	audio: Boolean,
	clickEdit: Boolean,
	showbase: Boolean,
	modelValue: Array,
	displayList: Array
})

const emit = defineEmits(['update:modelValue', 'onedit'])

function moveDown(fromIndex){
	if(fromIndex === props.modelValue.length-1) return
	var temp = [...props.modelValue]
	var element = temp[fromIndex];
	temp.splice(fromIndex, 1);
	temp.splice(fromIndex+1, 0, element);
	emit('update:modelValue', temp)
}

function moveUp(fromIndex){
	if(fromIndex === 0) return
	var temp = [...props.modelValue]
	var element = temp[fromIndex];
	temp.splice(fromIndex, 1);
	temp.splice(fromIndex-1, 0, element);
	emit('update:modelValue', temp)
}

function remove(index){
	var temp = [...props.modelValue]
	temp.splice(index, 1)
	emit('update:modelValue', temp)
}
</script>

<style>
.sort-list-header .button-group{
	opacity: 0;
}
.sort-list-header:hover .button-group {
	opacity: 1;
}

.button-group .hidden-btn {
	pointer-events: none;
	opacity: 0;
}
</style>