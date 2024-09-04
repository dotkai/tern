<template>
<div>
	<q-card v-for="(item, index) in displayList" :key="item._id" class="row items-center q-px-md">
	  <div class="col-1">{{index+1}} -</div>
	  <q-img
	  	v-if="image"
	    :src="getImageUrl(item)"
	    spinner-color="white"
	    style="height: 140px; max-width: 150px"
	    class="q-mr-md"
	    />
	  <div class="col text-subtitle2">{{item.name || item}}</div>
	  <q-btn round flat icon="arrow_downward" @click="moveDown(index)" />
	  <q-btn round flat icon="arrow_upward" @click="moveUp(index)" />
	  <q-btn round flat icon="clear" @click="remove(index)" />
	</q-card>
</div>
</template>

<script>
export default {
	props: {
		image: Boolean,
		modelValue: Array,
		displayList: Array
	},
	methods: {
		getImageUrl(filename){
	      return `${this.$api.defaults.baseURL}/public/images/${filename}`
	    },
		moveDown(fromIndex){
	      if(fromIndex === this.modelValue.length-1) return
	      var temp = [...this.modelValue]
	      var element = temp[fromIndex];
	      temp.splice(fromIndex, 1);
	      temp.splice(fromIndex+1, 0, element);
	      this.$emit('update:modelValue', temp)
	    },
	    moveUp(fromIndex){
	      if(fromIndex === 0) return
	      var temp = [...this.modelValue]
	      var element = temp[fromIndex];
	      temp.splice(fromIndex, 1);
	      temp.splice(fromIndex-1, 0, element);
	      this.$emit('update:modelValue', temp)
	    },
	    remove(index){
	    	var temp = [...this.modelValue]
	      temp.splice(index, 1)
	      this.$emit('update:modelValue', temp)
	    }
	}
}
</script>