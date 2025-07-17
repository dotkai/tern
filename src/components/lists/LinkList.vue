<template>
<q-list>
    <q-item
        v-for="link in list"
        :key="link.title"
        v-bind="link"
    >
        <q-item-section
        v-if="link.icon"
        avatar
        >
        <q-icon :name="link.icon" />
        </q-item-section>

        <q-item-section>
        <q-item-label>{{ link.title }}</q-item-label>
        </q-item-section>
    </q-item>
</q-list>
</template>

<script setup>
defineProps({
    list: Array
})
</script>