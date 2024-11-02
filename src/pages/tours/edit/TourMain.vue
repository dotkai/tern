<template>
<section>
    <LabelWrapper name="Cover Image">
        <CoverImageSelect v-model:path="store.cover_image_path" />
    </LabelWrapper>
    <LabelWrapper name="Title">
        <q-input class="col" filled v-model="store.title" />
    </LabelWrapper>
    <LabelWrapper name="Active Tour">
        <div>
            <q-btn  
                unelevated
                :flat="!store.active"
                :color="store.active? 'green' : 'grey'" 
                label="Active"
                @click="store.active = !store.active" />
            <q-btn 
                unelevated
                :flat="store.active"
                :color="store.active? 'grey' : 'orange'" 
                label="Inactive"
                @click="store.active = !store.active" />
        </div>
    </LabelWrapper>
    <LabelWrapper name="Brief">
      <q-input class="col" filled v-model="store.brief" />
    </LabelWrapper>
    <GroupTagSelect v-model:group="store.group" v-model:tags="store.tags" />
    <LabelWrapper name="Description" style="height: 350px;">
      <div class="col">
        <TextEditor v-model:content="store.description" />
      </div>
    </LabelWrapper>
</section>
</template>

<script setup>
import { useTourStore } from 'src/modules/tours/TourStore';
import LabelWrapper from 'src/components/wrappers/LabelWrapper.vue'
import GroupTagSelect from 'src/modules/groups/GroupTagSelect.vue';
import TextEditor from 'src/components/forms/TextEditor.vue';
import CoverImageSelect from 'src/modules/images/CoverImageSelect.vue';

const store = useTourStore()
</script>