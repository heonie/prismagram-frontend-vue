<template>
    <div class="post">
        <header>
            <Avatar size="sm" :url="avatar || defaultAvatar" />
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
                :class="{showing: index === currentItem}"
                :style="{backgroundImage: `url(${file.url})`}"
                @click="nextFile"
            />
        </div>
        <div class="filedots">
            <div class="filedot"
                 v-for="(file, index) in files"
                 :key="file.id"
                 :class="{active: index === currentItem}"
            ></div>
        </div>
        <div class="meta">
            <div class="buttons">
                <Button @click="toggleLike">
                    <IconHeartFull v-if="isLikedRender"/>
                    <IconHeartEmpty v-if="!isLikedRender"/>
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
                    <router-link :to="comment.user.username">
                        <FatText :text="comment.user.username" />
                    </router-link>{{comment.text}}
                </li>
                <li
                    class="comment"
                    v-for="comment in selfComments"
                    :key="comment.id"
                >
                    <router-link :to="comment.user.username">
                        <FatText :text="comment.user.username" />
                    </router-link>{{comment.text}}
                </li>
            </ul>
            <span class="timestamp">{{createdAtText}}</span>
            <Textarea
                placeholder="Add a comment..."
                v-model="newComment"
            />
            <Button @click="addComment">Submit</Button>
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
    import {TOGGLE_LIKE, ADD_COMMENT} from "../queries";

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
            id: String,
            user: Object,
            location: String,
            files: Array,
            isLiked: Boolean,
            likeCount: Number,
            createdAt: String,
            comments: Array,
            caption: String
        },
        data() {
            return {
                isLikedRender: this.isLiked || false,
                likeCountRender: this.likeCount || 0,
                newComment: "",
                selfComments: [],
                currentItem: 0,
                defaultAvatar: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAABlBMVEXJycmcnJyshIZ4AAAB7ElEQVR4nO3bUW7DMAwEUfv+ly4SGEXQ2kksk1xqPXMCvj8BIpeFiIiIiIiIiIiIiIiIiKio9TX1MIOt+6nHOtcBYjbMB8YklC8UM1i+ZjSnnHL0lZxkdKUMMFpSBh3tJMOOXpILjFaUi442ksuOJpIARwtJiKOBJMihl7hAwhxiSaBDKgl1KCUukGCHThIOEUniHRpIgkMjcYGkOBQSIM0kWQ4g3RzVEiBApnPUSoAAAaJzVEqAAAECBAgQIECAzCopdAABAkQoKXUAATKfpNjhA7H5Q+RXtx3EZvPBB2KzHeSzr+WzQWez0+gDsdn79dnE9tmN94HY3I/4XPT43Fj5XL353CEuNpehi8+trs/19GJzz74MSNQDH2fCeGTCeGTCeOah2LJA/OZgICIioq35nygOr9+Phhk0JxCNMQOKhpZhRS/LRUYTSoCigyWMoaWEMnSUcIaGksIQUNIcRjvlhZRkR5UknVFEKXHkS4oY6ZRCR6qk1JEoKXakScodSRKBI0MiYSRQZI5gidARK3GBSB2BErEjTKJmrEESNeKZiyNCohZsuTguS9TjvwSkmeOSRD36n4CoB//X3SHqsXe6N0Q99G53hqhHPghIt1wc5yXqeQ+7K0Q97puAdOueEPWwbwPSLSDd2p34B3GsN/j6gvMWAAAAAElFTkSuQmCC"
            }
        },
        computed: {
            username() {
                return this.user.username
            },
            avatar() {
                return this.user.avatar
            },
            likeCountText() {
                return this.likeCountRender === 1 ?
                    "1 like" : `${this.likeCountRender} likes`;
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
                const postId = this.id;
                this.$apollo.mutate({
                    // Query
                    mutation: TOGGLE_LIKE,
                    variables: {
                        postId
                    }
                }).then((() => {
                    if(this.isLikedRender) {
                        this.likeCountRender--;
                    }
                    else {
                        this.likeCountRender++;
                    }
                    this.isLikedRender = !this.isLikedRender;
                }).bind(this)).catch(((ex) => {
                    this.$toast.error(ex.message);
                }).bind(this));
            },
            addComment(e) {
                const postId = this.id;
                const text = this.newComment.trim();
                this.$apollo.mutate({
                    // Query
                    mutation: ADD_COMMENT,
                    variables: {
                        postId, text
                    }
                }).then(((data) => {
                    const {
                        data: { addComment }
                    } = data;
                    this.selfComments = [...this.selfComments, addComment];
                    this.newComment = "";
                }).bind(this)).catch(((ex) => {
                    this.$toast.error(ex.message);
                }).bind(this));
            },
            nextFile() {
                this.currentItem = (this.currentItem+1) % this.files.length;
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

.filedots {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 20px;
}
.filedot {
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: theme("darkGreyColor");
    margin: 0 3px;
}
.filedot.active {
    background-color: theme("blueColor");
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