<template>
    <div class="post">]
        <header>
            <Avatar size="sm" :url="avatar" />
            <div class="usercolumn">
                <router-link :to="`/${username}`">
                    <FatText :text="username" />
                </router-link>
                <span class="location">{{location}}</span>
            </div>
        </header>
        <div class="files">
            <div
                v-for="(file, index) in files"
                class="file"
                :key="file.id"
                :src="file.url"
                :class="{showing: index === this.currentItem}"
                :style="{backgroundImage: `url(${file.src})`}"
            />
        </div>
        <div class="meta">
            <div class="buttons">
                <Button onClick="toggleLike">
                    <IconHeartFull v-if="isLiked"/>
                    <IconHeartEmpty v-if="!isLiked"/>
                </Button>
                <Button>
                    <IconComment/>
                </Button>
            </div>
            <FatText :text="likeCountText" />
            <div class="caption">
                <FatText :text="username" /> {{caption}}
            </div>
            <ul class="comments" v-if="comments">
                <li
                    class="comment"
                    v-for="comment in comments"
                    :key="comment.id"
                >
                    <FatText text="comment.user.username" />
                    {{comment.text}}
                </li>
                <li
                    class="comment"
                    v-for="comment in selfComments"
                    :key="comment.id"
                >
                    <FatText text="comment.user.username" />
                    {{comment.text}}
                </li>
            </ul>
            <span class="timestamp">{{createdAtText}}</span>
            <Textarea
                :onKeyPress="onKeyPress"
                placeholder="Add a comment..."
                v-model="newComment"
            />
        </div>
    </div>
</template>

<script>
    import Textarea from "./AutosizeTextarea"
    import IconComment from "./IconComment";
    import IconHeartFull from "./IconHeartFull";
    import IconHeartEmpty from "./IconHeartEmpty";
    import Avatar from "./Avatar";
    import FatText from "./FatText";
    import moment from "moment";

    export default {
        name: "Post",
        components: {
            Textarea,
            IconComment,
            IconHeartFull,
            IconHeartEmpty,
            Avatar,
            FatText
        },
        props: {
            user: Object,
            location: String,
            files: Array,
            isLiked: Boolean,
            likeCount: Number,
            createdAt: String,
            comments: Array,
            selfComments: Array,
            caption: String
        },
        data: () => ({
            newComment: "",
            currentItem: 0
        }),
        computed: {
            username() {
                return this.user.username
            },
            avatar() {
                return this.user.avatar
            },
            likeCountText() {
                return this.likeCount === 1 ?
                    "1 like" : `${this.likeCount} likes`;
            },
            createdAtText() {
                return moment
                    .duration(this.createdAt-Date.now(), 'milliseconds')
                    .locale(navigator.language || 'en')
                    .humanize(true)
            }
        },
        methods: {
            toggleLike() {

            },
            onKeyPress() {

            }
        }
    }
</script>

<style scoped lang="scss">
@import "../styles/themes";

.post {
    @include whiteBox;
    width: 100%;
    max-width: 600px;
    user-select: none;
    margin-bottom: 25px;
    a {
        color: inherit;
    }
}

header {
    padding: 15px;
    display: flex;
    align-items: center;
}

.usercolumn {
    margin-left: 10px;
}

.location {
    display: block;
    margin-top: 5px;
    font-size: 12px;
}

.files {
    position: relative;
    padding-bottom: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex-shrink: 0;
}

.file {
    max-width: 100%;
    width: 100%;
    height: 600px;
    position: absolute;
    top: 0;
    background-size: cover;
    background-position: center;
    opacity: 0;
    transition: opacity 0.5s linear;
}
.file.showing {
    opacity: 1;
}

.meta {
    padding: 15px;
}

.buttons {
    button:first-child {
        margin-right: 10px;
    }
    margin-bottom: 10px;
}

.timestamp {
    font-weight: 400;
    text-transform: uppercase;
    opacity: 0.5;
    display: block;
    font-size: 12px;
    margin: 10px 0px;
    padding-bottom: 10px;
    border-bottom: theme("lightGreyColor") 1px solid;
}

textarea {
    border: none;
    width: 100%;
    resize: none;
    font-size: 14px;
    font-family: 'Open Sans', sans-serif;
    &:focus {
        outline: none;
    }
}

.comments {
    margin-top: 10px;
}

.comment {
    margin-bottom: 7px;
    span {
        margin-right: 5px;
    }
}

.caption {
    margin: 10px 0px;
}
</style>