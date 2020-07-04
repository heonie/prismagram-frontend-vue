<template>
    <div
        class="container"
        :class="size"
        :style="{backgroundImage: `url(${url})`}"
    >
    </div>
</template>

<script>
    export default {
        name: "Avatar",
        props: ["size", "url"]
    }
</script>

<style scoped>
    div {
        background-size: cover;
        border-radius: 50%;
    }
    div.sm {
        width: 30px;
        height: 30px;
    }
    div.md {
        width: 50px;
        height: 50px;
    }
    div.lg {
        width: 150px;
        height: 150px;
    }
</style>