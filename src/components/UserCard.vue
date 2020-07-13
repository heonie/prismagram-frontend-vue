<template>
    <div class="card">
        <Avatar class="EAvatar" :url="url" size="md" />
        <router-link class="link" :to="`/${username}`">
            <FatText :text="username" />
        </router-link>
        <FollowButton
            v-if="!isSelf"
            :id="id"
            :isFollowing="isFollowing" />
    </div>
</template>

<script>
    import Avatar from "./Avatar";
    import FatText from "./FatText";
    import FollowButton from "./FollowButton";
    export default {
        name: "UserCard",
        components: {
            Avatar,
            FatText,
            FollowButton
        },
        props: {
            id: {
                type: String,
                required: true
            },
            username: {
                type: String,
                required: true
            },
            isFollowing: {
                type: Boolean,
                required: true
            },
            url: {
                validator: prop => typeof prop === 'string' || prop === null,
                required: true
            },
            isSelf: {
                type: Boolean,
                required: true
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../styles/themes";
    .card {
        @include whiteBox;
        display:flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
    }

    .EAvatar {
        margin-bottom: 15px;
    }

    .link {
        color: inherit;
        margin-bottom: 10px;
    }
</style>