<template>
    <Button
        @click="onClick"
    >{{buttonText}}</Button>
</template>

<script>
    import Button from "./Button";
    import {FOLLOW, UNFOLLOW} from "../queries";
    export default {
        name: "FollowButton",
        components: {
            Button
        },
        props: {
            isFollowing: Boolean,
            id: String
        },
        data() {
            return {
                isFollowingRender: !!this.isFollowing
            }
        },
        computed: {
            buttonText() {
                return this.isFollowingRender ? "Unfollow" : "Follow";
            }
        },
        methods: {
            onClick() {
                if(this.isFollowingRender) {
                    this.setUnfollow();
                }
                else {
                    this.setFollow();
                }
            },
            setFollow() {
                console.log('setFollow');
                const id = this.id;
                this.$apollo.mutate({
                    // Query
                    mutation: FOLLOW,
                    variables: {
                        id
                    }
                }).then((() => {
                    this.isFollowingRender = true;
                }).bind(this)).catch(((ex) => {
                    this.$toast.error(ex.message);
                }).bind(this));
            },
            setUnfollow() {
                console.log('setUnfollow');
                const id = this.id;
                this.$apollo.mutate({
                    // Query
                    mutation: UNFOLLOW,
                    variables: {
                        id
                    }
                }).then((() => {
                    this.isFollowingRender = false;
                }).bind(this)).catch(((ex) => {
                    this.$toast.error(ex.message);
                }).bind(this));
            }
        }
    }
</script>

<style scoped>

</style>