<template>
    <Cadre :widthCadre="960" :heightCadre="540"></Cadre>
    <!--<Cadre :widthCadre="480" :heightCadre="270" v-on:selectedTextEditor="selectedTextEditor" v-on:unselectedTextEditor="unselectedTextEditor"></Cadre>
    <Cadre :widthCadre="1920" :heightCadre="1080" v-on:selectedTextEditor="selectedTextEditor" v-on:unselectedTextEditor="unselectedTextEditor"></Cadre>-->

</template>

<script>
import Cadre from "@/components/Cadre";

export default {
  name: 'Page',
  components: {
    Cadre,

  },
  data: function () {
    return {

    };
  },
  methods: {

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 100px;

}
</style>
