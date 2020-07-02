<template>
    <footer>
        <ul>
            <li>
                <a href="#">about us</a>
            </li>
            <li>
                <a href="#">support</a>
            </li>
            <li>
                <a href="#">press</a>
            </li>
            <li>
                <a href="#">api</a>
            </li>
            <li>
                <a href="#">jobs</a>
            </li>
            <li>
                <a href="#">privacy</a>
            </li>
            <li>
                <a href="#">terms</a>
            </li>
            <li>
                <a href="#">directory</a>
            </li>
            <li>
                <a href="#">profiles</a>
            </li>
            <li>
                <a href="#">hashtags</a>
            </li>
            <li>
                <a href="#">language</a>
            </li>
        </ul>
        <span>Instaclone {{new Date().getFullYear()}} &copy;</span>
    </footer>
</template>

<script>
export default {
    name: "Footer"
}
</script>

<style scoped lang="scss">
@import '../styles/themes';
@use "sass:map";
footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 12px;
    margin: 50px 0px;
}

ul {
    display: flex;
}
li:not(:last-child) {
    margin-right: 16px;
}

a {
    color: map-get($themes, "darkBlueColor");
}
span {
    color: map-get($themes, "darkGreyColor");
}
</style>