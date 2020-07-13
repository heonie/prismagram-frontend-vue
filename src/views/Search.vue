<template>
    <div class="search">
        <FatText v-if="!searchTerm" text="Search for something" />
        <Loader v-if="searchTerm && loading"/>
        <div class="section" v-if="searchTerm && !loading">
            <FatText v-if="data.searchUser.length <= 0" text="No Users Found" />
            <UserCard
                v-for="user in data.searchUser"
                :id="user.id"
                :key="user.id"
                :username="user.username"
                :isFollowing="user.isFollowing"
                :url="user.avatar"
                :isSelf="user.isSelf"
            />
        </div>
        <div class="section postsection" v-if="searchTerm && !loading">
            <FatText v-if="data.searchPost.length <= 0" text="No Posts Found" />
            <SquarePost
                v-for="post in data.searchPost"
                :id="post.id"
                :key="post.id"
                :likeCount="post.likeCount"
                :commentCount="post.commentCount"
                :file="post.files[0]"
            />
        </div>
    </div>
</template>

<script>
    import Loader from "../components/Loader";
    import UserCard from "../components/UserCard";
    import FatText from "../components/FatText";
    import SquarePost from "../components/SquarePost";
    import {SEARCH} from "../queries";

    export default {
        name: "Search",
        components: {UserCard, Loader, FatText, SquarePost},
        props: {
            searchTerm: String
        },
        data: () => ({
            data: {
                searchPost: [],
                searchUser: []
            }
        }),
        computed: {
            loading() {
                return this.$apollo.loading
            }
        },
        apollo: {
            data: {
                query: SEARCH,
                variables() {
                    return {
                        term: this.searchTerm
                    }
                },
                update: data => data    // suppressing "Missing data attribute on result" Error
            }
        }
    }
</script>

<style scoped>
    .search {
        height: 50vh;
        margin-top: 80px;
    }
    .section {
        margin-bottom: 50px;
        display: grid;
        grid-gap: 25px;
        grid-template-columns: repeat(4, 160px);
        grid-template-rows: 160px;
        grid-auto-rows: 160px;
    }
    .section.postsection {
        grid-template-columns: repeat(4, 200px);
        grid-template-rows: 200px;
        grid-auto-rows: 200px;
    }
</style>