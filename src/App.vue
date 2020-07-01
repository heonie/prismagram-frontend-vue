<template>
  <ThemeProvider :theme="theme">
    <div id="app">
        <Header v-if="isLoggedIn"></Header>
        <router-view/>
        <Footer></Footer>
    </div>
  </ThemeProvider>
</template>
<script>
  import Footer from "./components/Footer";
  import Header from "./components/Header";
  import theme from "./styles/theme";
  import {ThemeProvider} from "vue-styled-components";
  import gql from 'graphql-tag'
  const QUERY = gql`
      {
          isLoggedIn @client
      }
  `;

  export default {
    name: "App",
    components: {
      ThemeProvider,
      Footer,
      Header
    },
    data() {
      return {
        theme,
        isLoggedIn: false
      }
    },
    apollo: {
      isLoggedIn: QUERY
    }
  }
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');
$bgColor: #FAFAFA;
$blackColor: #262626;
$blueColor: #3897f0;

* {
  box-sizing:border-box;
}
body {
  background-color: $bgColor;
  color: $blackColor;
  font-size:14px;
  font-family: 'Open Sans', sans-serif !important;
  padding-top: 140px;
}
a {
    color:$blueColor;
    text-decoration:none;
}
input:focus{
    outline:none;
}
</style>
