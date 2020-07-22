<template>
    <div id="app">
        <Header v-if="isLoggedIn"></Header>
        <div class="wrapper">
            <router-view/>
            <Footer></Footer>
        </div>
    </div>
</template>
<script>
  import Footer from "./components/Footer";
  import Header from "./components/Header";
  import {IS_LOGGED_IN} from "./queries";

  export default {
    name: "App",
    components: {
      Footer,
      Header
    },
    data() {
      return {
        isLoggedIn: false
      }
    },
    apollo: {
      isLoggedIn: IS_LOGGED_IN
    }
  }
</script>
<style lang="scss">
@import './styles/themes';
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');

* {
  box-sizing:border-box;
}
body {
  background-color: theme("bgColor");
  color: theme("blackColor");
  font-size:14px;
  font-family: 'Open Sans', sans-serif !important;
  padding-top: 140px;
}
a {
    color: theme("blueColor");
    text-decoration:none;
}
input:focus{
    outline:none;
}
</style>
<style scoped lang="scss">
@import './styles/themes';
.wrapper {
    margin: 0 auto;
    margin-top: 80px;
    max-width: theme("maxWidth");
    width: 100%;
}
</style>
