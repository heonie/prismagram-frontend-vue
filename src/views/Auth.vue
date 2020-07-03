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
                    <Input placeholder="Paste your secret" required v-model="secret" />
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
    import {LOG_IN, CREATE_ACCOUNT, CONFIRM_SECRET, LOCAL_LOG_IN} from "../queries";
    import Button from "../components/Button";
    import Input from "../components/Input";
    import VueHeadful from "vue-headful";

    export default {
        name: "Auth",
        components: {
            Button,
            Input,
            VueHeadful
        },
        data: () => ({
            action: "logIn",
            email: "heonie@gmail.com",
            username: "",
            firstName: "",
            lastName: "",
            secret: ""
        }),
        apollo: {

        },
        methods: {
            setAction (action, timeout = 0) {
                if(timeout > 0) {
                    setTimeout(this.setAction.bind(this, action), timeout);
                }
                else {
                    this.action = action;
                }
            },
            onSubmitLogIn(e) {
                e.preventDefault();
                const {email} = this;
                if (email !== "") {
                    this.$apollo.mutate({
                        // Query
                        mutation: LOG_IN,
                        variables: {
                            email
                        }
                    }).then(((data) => {
                        const {
                            data: {requestSecret}
                        } = data;
                        if (!requestSecret) {
                            this.$toast.error("You dont have an account yet, create one");
                            this.setAction("signUp", 3000);
                        } else {
                            this.$toast.success("Check your inbox for your login secret");
                            this.setAction("confirm");
                        }
                    }).bind(this))
                    .catch(((ex) => {
                        console.error(ex);
                        this.$toast.error("Can't request secret, try again");
                    }).bind(this));
                }
                else {
                    this.$toast.error("Email is required");
                }
            },
            onSubmitSignUp(e) {
                e.preventDefault();
                const {
                    email,
                    username,
                    firstName,
                    lastName
                } = this;
                if (
                    email !== "" &&
                    username !== "" &&
                    firstName !== "" &&
                    lastName !== ""
                ) {
                    this.$apollo.mutate({
                        // Query
                        mutation: CREATE_ACCOUNT,
                        variables: {
                            email,
                            username,
                            firstName,
                            lastName
                        }
                    }).then(((data) => {
                        const {data: createAccount} = data;
                        if (!createAccount) {
                            this.$toast.error("Can't create account");
                        } else {
                            this.$toast.success("Account created! Log In now");
                            setTimeout(() => this.setAction("logIn"), 3000);
                        }
                    }).bind(this)).catch(((ex)=>{
                        this.$toast.error(ex.message);
                    }));
                }
                else {
                    this.$toast.error("All field are required");
                }
            },
            onSubmitConfirm(e) {
                e.preventDefault();
                const {
                    email,
                    secret
                } = this;
                if (secret !== "") {
                    this.$apollo.mutate({
                        // Query
                        mutation: CONFIRM_SECRET,
                        variables: {
                            email,
                            secret
                        }
                    }).then(((data) => {
                        const {
                            data: { confirmSecret: token }
                        } = data
                        if (token !== "" && token !== undefined) {
                            this.$apollo.mutate({
                                // Query
                                mutation: LOCAL_LOG_IN,
                                variables: { token }
                            }).then((() => {
                                this.$router.push('/');
                            }).bind(this));
                        } else {
                            throw Error();
                        }
                    }).bind(this)).catch(((ex) => {
                        this.$toast.error("Cant confirm secret,check again");
                    }).bind(this));
                }
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