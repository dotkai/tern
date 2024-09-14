<template>
<div>
	<q-card v-for="(item, index) in displayList" :key="item._id">
	  <div class="row items-center q-px-md">
		<div class="col-1">{{index+1}} -</div>
		<div class="row col" :class="{ 'hover': clickEdit }" @click="clickEdit? $emit('onedit', item) : null">
			<q-img
				v-if="image"
				:src="'/image_files/'+item.path"
				error-src="util_images/noimage.png"
				spinner-color="white"
				style="height: 140px; max-width: 150px"
				class="q-mr-md"
				/>
			<div class="col q-py-md">
				<div class=" text-subtitle2">{{item.name || item}}</div>
				<div v-if="caption">{{ item.caption }}</div>
			</div>
		</div>
		<q-btn v-if="clickEdit" round flat icon="edit" @click="$emit('onedit', item)" />
		<q-btn round flat icon="arrow_downward" @click="moveDown(index)" />
		<q-btn round flat icon="arrow_upward" @click="moveUp(index)" />
		<q-btn round flat icon="clear" @click="remove(index)" />
	  </div>
	  <AudioPlayer
	  	v-if="audio"
		:audioPath="item.path"
		/>
	</q-card>
</div>
</template>

<script>
import AudioPlayer from 'src/modules/audio/AudioPlayer.vue';
export default {
	components: {
		AudioPlayer
	},
	props: {
		audio: Boolean,
		image: Boolean,
		caption: Boolean,
		clickEdit: Boolean,
		modelValue: Array,
		displayList: Array
	},
	methods: {
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