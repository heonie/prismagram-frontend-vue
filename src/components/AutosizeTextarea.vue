<template>
    <textarea
        ref="textarea"
        :value="value"
        @input="handleInput"
        @keydown="resize"
        @keyup="resize"
    ></textarea>
</template>

<script>
    export default {
        name: "AutosizeTextarea",
        props: {
            value: String
        },
        mounted() {
            this.textarea = this.$refs.textarea;
        },
        methods: {
            handleInput(event) {
                this.$emit("input", event.target.value);
            },
            resize() {
                this.textarea.style.height = "1px";
                this.textarea.style.height = (12+this.textarea.scrollHeight)+"px";
            }
        }
    }
</script>

<style scoped>

</style>