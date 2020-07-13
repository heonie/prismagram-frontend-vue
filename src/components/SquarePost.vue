<template>
    <div class="container" :style="{backgroundImage: `url(${file.url})`}">
        <div class="overlay" >
            <div class="number">
                <IconHeartFull />
                <span class="numbertext">{{likeCount}}</span>
            </div>
            <div class="number">
                <IconCommentFull />
                <span class="numbertext">{{commentCount}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import IconHeartFull from "./IconHeartFull";
    import IconCommentFull from "./IconCommentFull";
    export default {
        name: "SquarePost",
        components: {IconCommentFull, IconHeartFull},
        props: {
            file: Object,
            likeCount: Number,
            commentCount: Number
        }
    }
</script>

<style scoped lang="scss">
    @import "../styles/themes";
    .container {
        background-size: cover;
        cursor: pointer;
        &:hover {
            .overlay {
                opacity: 1;
            }
        }
    }
    .overlay {
        background-color: rgba(0, 0, 0, 0.6);
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: opacity 0.3s linear;
        svg {
            fill: white;
        }
    }
    .number {
        color: white;
        display: flex;
        align-items: center;
        &:first-child {
            margin-right: 30px;
        }
    }
    .numbertext {
        margin-left: 10px;
        font-size: 16px;
    }
</style>