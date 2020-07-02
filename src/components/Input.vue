<template>
    <input
        :placeholder="placeholder"
        :required="required"
        :value="value"
        :type="type"
        :onChange="onChange"
    />
</template>

<script>
    export default {
        name: "Input",
        props: {
            placeholder: {
                type: String,
                required: true
            },
            required: {
                type: Boolean,
                default: true
            },
            value: {
                type: String,
                default: ""
            },
            type: {
                type: String,
                default: "text"
            },
            onChange: {
                type: Function
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