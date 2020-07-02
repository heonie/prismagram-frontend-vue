<template>
    <AuthPresenter
        :action="action"
        @submit="onSubmit"
        :setAction="setAction"
    ></AuthPresenter>
</template>

<script>
    import {LOG_IN, CREATE_ACCOUNT, CONFIRM_SECRET, LOCAL_LOG_IN} from "../queries";
    import AuthPresenter from "../components/AuthPresenter";

    export default {
        name: "Auth",
        components: {
            AuthPresenter
        },
        data: () => ({
            action: "logIn"
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
            requestSecretMutation: () => {
                console.log("requestSecretMutation");
                return this.$apollo.mutate({
                    // Query
                    mutation: LOG_IN,
                    variables: {
                        email: this.email
                    }
                });
            },
            createAccountMutation: () => {
                return this.$apollo.mutate({
                    // Query
                    mutation: CREATE_ACCOUNT,
                    variables: {
                        email: this.email,
                        username: this.username,
                        firstName: this.firstName,
                        lastName: this.lastName
                    }
                });
            },
            confirmSecretMutation: () => {
                return this.$apollo.mutate({
                    // Query
                    mutation: CONFIRM_SECRET,
                    variables: {
                        email: this.email,
                        secret: this.secret
                    }
                });
            },
            localLogInMutation: () => {
                return this.$apollo.mutate({
                    // Query
                    mutation: LOCAL_LOG_IN
                });
            },
            onSubmit: (e, data) => {
                const {action} = data;
                if (action === "logIn") {
                    const {email} = data;
                    if (email !== "") {
                        this.requestSecretMutation()
                            .then((data) => {
                                const {
                                    data: {requestSecret}
                                } = data;
                                if (!requestSecret) {
                                    this.$notify.error("You dont have an account yet, create one");
                                    this.setAction("signUp", 3000);
                                } else {
                                    this.$notify.success("Check your inbox for your login secret");
                                    this.setAction("confirm");
                                }
                            })
                            .catch((ex) => {
                                this.$notify.error("Can't request secret, try again");
                            });
                    } else {
                        this.$notify.error("Email is required");
                    }
                }
                else if (this.action === "signUp") {
                    // if (
                    //     email.value !== "" &&
                    //     username.value !== "" &&
                    //     firstName.value !== "" &&
                    //     lastName.value !== ""
                    // ) {
                    //     try {
                    //         const {
                    //             data: { createAccount }
                    //         } = await createAccountMutation();
                    //         if (!createAccount) {
                    //             toast.error("Can't create account");
                    //         }
                    //         else {
                    //             toast.success("Account created! Log In now");
                    //             setTimeout(() => setAction("logIn"), 3000);
                    //         }
                    //     }
                    //     catch (e) {
                    //         toast.error(e.message);
                    //     }
                    // }
                    // else {
                    //     toast.error("All field are required");
                    // }
                }
                else if (this.action === "confirm") {
                    // if (secret.value !== "") {
                    //     try {
                    //         const {
                    //             data: { confirmSecret: token }
                    //         } = await confirmSecretMutation();
                    //         if (token !== "" && token !== undefined) {
                    //             localLogInMutation({ variables: { token } });
                    //         } else {
                    //             throw Error();
                    //         }
                    //     } catch {
                    //         toast.error("Cant confirm secret,check again");
                    //     }
                    // }
                }
            }
        }
    }
</script>

<style scoped>

</style>