<template>
    <AuthPresenter action="confirm" onSubmit="onSubmit"></AuthPresenter>
</template>

<script>
    import {LOG_IN, CREATE_ACCOUNT, CONFIRM_SECRET, LOCAL_LOG_IN} from "../queries";
    import AuthPresenter from "../components/AuthPresenter";

    export default {
        name: "Auth",
        components: {
            AuthPresenter
        },
        methods: {
            onSubmit: async(e) => {

            }
        }
    }
</script>

<style scoped>

</style>