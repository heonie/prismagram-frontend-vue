<template>
    <div class="header">
        <div class="wrapper">
            <div class="column">
                <router-link class="link" to="/">
                    <IconLogo />
                </router-link>
            </div>
            <div class="column">
                <form onSubmit="onSearchSubmit">
                    <Input
                        class="input"
                        v-model="search"
                        onChange="onChange"
                        placeholder="Search"
                    />
                </form>
            </div>
            <div class="column">
                <router-link class="link" to="/explore">
                    <IconCompass />
                </router-link>
                <router-link class="link" to="/notifications">
                    <IconHeartEmpty />
                </router-link>
                <router-link class="link" v-if="!me" to="/#">
                    <IconUser />
                </router-link>
                <router-link class="link" v-if="me" :to="me.username">
                    <IconUser />
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import Input from "./Input";
    import IconCompass from "./IconCompass";
    import IconHeartEmpty from "./IconHeartEmpty";
    import IconUser from "./IconUser";
    import IconLogo from "./IconLogo";
    import {ME} from "../queries";

    export default {
        name: "Header",
        components: {
            Input,
            IconCompass,
            IconHeartEmpty,
            IconUser,
            IconLogo
        },
        data: () => ({
            me: null,
            search: ""
        }),
        apollo: {
            me: ME
        }
    }
</script>

<style scoped lang="scss">
    @import "../styles/themes.scss";

    .header {
        width: 100%;
        border: 0;
        position: fixed;
        top: 0;
        left: 0;
        background-color: white;
        border-bottom: theme("boxBorder");
        border-radius: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 25px 0px;
        z-index: 2;
    }

    .wrapper {
        width: 100%;
        max-width: theme("maxWidth");
        display: flex;
        justify-content: center;
    }

    .column {
        width: 33%;
        text-align: center;
        &:first-child {
            margin-right: auto;
            text-align: left;
        }
        &:last-child {
            margin-left: auto;
            text-align: right;
        }
    }

    .input {
        background-color: theme("bgColor");
        padding: 5px;
        font-size: 14px;
        border-radius: 3px;
        height: auto;
        text-align: center;
        width: 70%;
        &::placeholder {
            opacity: 0.8;
            font-weight: 200;
        }
    }

    .link {
        &:not(:last-child) {
            margin-right: 30px;
        }
    }
</style>