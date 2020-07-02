<template>
    <div class="wrapper">
        <div class="box form">
            <div v-if="action === 'logIn'">
                <VueHeadful title="Log In | Prismagram" />
                <form @submit="onSubmitLogIn">
                    <Input placeholder="Email" v-model="email" type="email" />
                    <Button text="Log in" />
                </form>
            </div>
            <div v-if="action === 'signUp'">
                <VueHeadful title="Sign Up | Prismagram" />
                <form @submit="onSubmitSignUp">
                    <Input placeholder="First name" v-model="firstName" />
                    <Input placeholder="Last name" v-model="lastName" />
                    <Input placeholder="Email" v-model="email" type="email" />
                    <Input placeholder="Username" v-model="username" />
                    <Button text="Sign up" />
                </form>
            </div>
            <div v-if="action === 'confirm'">
                <VueHeadful title="Confirm Secret | Prismagram" />
                <form @submit="onSubmitConfirm">
                    <Input placeholder="Paste your secret" required :value="secret" />
                    <Button text="Confirm" />
                </form>
            </div>
        </div>
        <div class="box statechanger" v-if="action !== 'confirm'">
            <div v-if="action === 'logIn'">
                Don't have an account?
                <span class="link" @click="setAction('signUp')">Sign up</span>
            </div>
            <div v-if="action !== 'logIn'">
                Have an account?
                <span class="link" @click="setAction('logIn')">Log in</span>
            </div>
        </div>
    </div>
</template>

<script>
    import VueHeadful from 'vue-headful'
    import Button from "./Button";
    import Input from "./Input";
    export default {
        name: "AuthPresenter",
        components: {
            Button,
            Input,
            VueHeadful
        },
        data: () => ({
            email: "heonie@gmail.com",
            username: "",
            firstName: "",
            lastName: "",
            secret: ""
        }),
        props: [
            "action",
            "setAction",
            "onSubmit"
        ],
        methods: {
            onSubmitLogIn(e) {
                e.preventDefault();
                this.$emit('submit', e, {
                    action: this.action,
                    email: this.email
                });
            },
            onSubmitSignUp(e) {
                e.preventDefault();
                this.$emit('submit', e, {
                    action: this.action,
                    email: this.email,
                    username: this.username,
                    firstName: this.firstName,
                    lastName: this.lastName
                });
            },
            onSubmitConfirm(e) {
                e.preventDefault();
                this.$emit('submit', e, {
                    action: this.action,
                    email: this.email,
                    secret: this.secret
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../styles/themes";

    .wrapper {
        min-height: 80vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .box {
        @include whiteBox;
        border-radius:0px;
        width: 100%;
        max-width: 350px;
    }

    .statechanger {
        text-align: center;
        padding: 20px 0px;
    }
    .link {
        color: theme("blueColor");
        cursor: pointer;
    }
    .form {
        padding: 40px;
        padding-bottom: 30px;
        margin-bottom: 15px;
        form {
            width: 100%;
            input {
                width: 100%;
                &:not(:last-child) {
                    margin-bottom: 7px;
                }
            }
            button {
                margin-top: 10px;
            }
        }
    }
</style>