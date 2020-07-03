<template>
    <input
        :value="value"
        @input="handleInput"
    />
</template>

<script>
    export default {
        name: "Input",
        props: {
            value: String
        },
        methods: {
            handleInput(event) {
                this.$emit("input", event.target.value);
            }
        }
    }
</script>

<style scoped lang="scss">
@import "../styles/themes";

input {
    border: 0;
    border: theme("boxBorder");
    border-radius: theme("borderRadius");
    background-color: theme("bgColor");
    height: 35px;
    font-size: 12px;
    padding: 0px 15px;
}
</style>