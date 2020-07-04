<template>
    <span>{{text}}</span>
</template>

<script>
    export default {
        name: "FatText",
        props: ["text"]
    }
</script>

<style scoped>
    span {
        font-weight: 600;
    }
</style>