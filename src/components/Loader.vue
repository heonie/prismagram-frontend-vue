<template>
    <div class="loader"><IconLogo :size="36"/></div>
</template>

<script>
    import IconLogo from "./IconLogo";
    export default {
        name: "Loader",
        components: {IconLogo}
    }
</script>

<style scoped>
    .loader {
        position: fixed;
        top: 50%;
        left: 50%;
        margin: -18px;
        animation: fadeInOut 1s linear infinite;
        text-align: center;
    }

    @keyframes fadeInOut {
        0%{
            opacity:0;
        }
        50%{
            opacity:1;
        }
        100%{
            opacity:0;
        }
    }
</style>