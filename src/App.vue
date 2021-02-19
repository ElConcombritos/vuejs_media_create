<template>
  <div id="app">
    <Cadre></Cadre>
  </div>

</template>

<script>
import Cadre from "@/components/Cadre";

export default {
  name: 'App',
  components: {
    Cadre,

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
