<template>
<div class="text-divider">
    <span>{{ label }}</span>
</div>
</template>

<script setup>
defineProps({
    label: String
})
</script>

<style lang="scss">
.text-divider {
    display: block;
    text-align: center;
    overflow: hidden;
    white-space: nowrap; 
}

.text-divider > span {
    position: relative;
    display: inline-block;
}

.text-divider > span:before,
.text-divider > span:after {
    content: "";
    position: absolute;
    top: 50%;
    width: 9999px;
    height: 1px;
    background: grey;
}

.text-divider > span:before {
    right: 100%;
    margin-right: 15px;
}

.text-divider > span:after {
    left: 100%;
    margin-left: 15px;
}
</style>