<script>
  import Header from './components/header.vue';
  import Main from './components/main.vue';
  import Footer from './components/footer.vue';

  export default{
    name: "App",
    data(){
      return{
      }
    },
  components:{
    Header,
    Main,
    Footer,
  },
};
</script>

<template>
  <Header></Header>
  <Main></Main>
  <Footer></Footer>
</template>

<style lang="scss">
@use './style/main.scss';
</style>