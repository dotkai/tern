<template>
<q-card class="note-card">
    <div class="row justify-between bg-grey-3">
        <div class="caption q-mx-md q-my-sm" style="opacity: 0.8;">{{date}}</div>
        <q-btn flat round size="sm" icon="edit" />
    </div>
    <q-separator />
    <div v-html="text" class="q-pa-md"></div>
</q-card>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    updated: [Number, Date],
    created: [Number, Date],
    text: String
})

const date = computed(_ => {
    let d = new Date(props.updated)
    return d.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
})
</script>

<style lang="scss">
.note-card {
    max-height: 130px;
    overflow: hidden;

    h1, h2, h3, h4, h5, h6 {
        padding: 0;
        margin: 0;
        margin-bottom: 15px;
    }
    h1 {
        font-size: 2rem;
        line-height: 2rem;
    }
    h2 {
        font-size: 1.5em;
        line-height: 1.5rem;
    }
}
</style>