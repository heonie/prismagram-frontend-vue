<template>
    <button>{{text}}</button>
</template>

<script>
    export default {
        name: "Button",
        props: {
            text: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../styles/themes";
    button {
        width: 100%;
        border: 0;
        border-radius: theme("borderRadius");
        color: white;
        font-weight: 600;
        background-color: theme("blueColor");
        text-align: center;
        padding: 7px 0px;
        font-size: 14px;
        cursor: pointer;
    }
</style>