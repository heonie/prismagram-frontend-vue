<template>
    <div class="wrapper">
        <VueHeadful :title="`${username} | Prismagram`" />
        <Loader v-if="loading" />
        <header class="header" v-if="!loading">
            <div class="headercolumn">
                <Avatar size="lg" :url="seeUser.avatar" />
            </div>
            <div class="headercolumn">
                <div class="usernamerow">
                    <span class="username">{{username}}</span>
                    <Button v-if="isLoggedIn && seeUser.isSelf" @click="logOut" text="Log Out" />
                    <FollowButton v-if="isLoggedIn && !seeUser.isSelf" :isFollowing="seeUser.isFollowing" :id="seeUser.id" />
                </div>
                <ul class="counts">
                    <li class="count">
                        <FatText :text="seeUser.postsCount" /> posts
                    </li>
                    <li class="count">
                        <FatText :text="seeUser.followersCount" /> followers
                    </li>
                    <li class="count">
                        <FatText :text="seeUser.followingCount" /> following
                    </li>
                </ul>
                <FatText class="fullname" :text="seeUser.fullName" />
                <p class="bio">{{seeUser.bio}}</p>
            </div>
        </header>
        <div class="posts">
            <SquarePost
                v-for="post in posts"
                :key="post.id"
                :likeCount="post.likeCount"
                :commentCount="post.commentCount"
                :file="post.files[0]"
            />
            <FatText v-if="posts.length <= 0" text="No Posts Found" />
        </div>
    </div>
</template>
<script>
    import VueHeadful from "vue-headful"
    import FatText from "../components/FatText";
    import Button from "../components/Button";
    import Avatar from "../components/Avatar";
    import FollowButton from "../components/FollowButton";
    import SquarePost from "../components/SquarePost";
    import {GET_USER, LOG_OUT, IS_LOGGED_IN} from "../queries";
    import Loader from "../components/Loader";

    export default {
        name: "Profile",
        components: {Loader, VueHeadful, FatText, Button, Avatar, FollowButton, SquarePost},
        props: {
            username: String
        },
        computed: {
            loading() {
                return this.$apollo.loading;
            },
            posts() {
                return this.seeUser ? this.seeUser.posts : []
            }
        },
        data() {
            return {
                seeUser: null,
                isLoggedIn: false
            }
        },
        apollo: {
            seeUser: {
                query: GET_USER,
                variables() {
                    const username = this.username;
                    return { username };
                }
            },
            isLoggedIn: IS_LOGGED_IN
        },
        methods: {
            logOut() {
                this.$apollo.mutate({
                    // Query
                    mutation: LOG_OUT   // will redirect to root by the resolver of the mutation
                }).catch(((ex) => {
                    console.error(ex);
                    this.$toast.error("Can't log out, try again");
                }).bind(this));
            }
        }
    }
</script>

<style scoped lang="scss">
    .wrapper {
        min-height: 100vh;
    }
    .header {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 80%;
        margin: 0 auto;
        margin-bottom: 40px;
    }
    .usernamerow {
        display: flex;
        align-items: center;
    }
    span.username {
        font-size: 26px;
        display: block;
    }
    ul.counts {
        display: flex;
        margin: 15px 0px;
    }
    li.count {
        font-size: 16px;
        &:not(:last-child) {
            margin-right: 10px;
        }
    }
    .fullname {
        font-size: 16px;
    }
    .bio {
        margin: 10px 0px;
    }
    .posts {
        display: grid;
        grid-template-columns: repeat(4, 200px);
        grid-template-rows: 200px;
        grid-auto-rows: 200px;
    }
</style>