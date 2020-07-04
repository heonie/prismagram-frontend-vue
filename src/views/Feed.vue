<template>
    <div class="feedwrapper">
        <VueHeadful title="Feed | Prismagram" />
        <Loader v-if="loading"/>
        <div class="posts" v-if="!loading && seeFeed">
            <Post
                v-for="post in seeFeed"
                :key="post.id"
                :id="post.id"
                :location="post.location"
                :caption="post.caption"
                :user="post.user"
                :files="post.files"
                :likeCount="post.likeCount"
                :isLiked="post.isLiked"
                :comments="post.comments"
                :createdAt="post.createdAt"
            />
        </div>
    </div>
</template>

<script>
    import Post from "../components/Post";
    import VueHeadful from "vue-headful";
    import Loader from "../components/Loader";
    import { SEE_FEED } from "../queries";

    export default {
        name: "Feed",
        components: {
            Post,
            VueHeadful,
            Loader
        },
        data: () => ({
            seeFeed: null
        }),
        computed: {
            loading() {
                return this.$apollo.loading
            }
        },
        apollo: {
            seeFeed: SEE_FEED
        }
    }
</script>

<style scoped lang="scss">
    .feedwrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 80vh;
    }
</style>