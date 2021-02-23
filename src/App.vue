<template>
  <div id="app" style="display: flex">
      <Cadre></Cadre>
    <div class="toolbar>">
      <tool-bar></tool-bar>
    </div>
  </div>

</template>

<script>
import Cadre from "@/components/Cadre";
import ToolBar from "@/components/ToolBar";

export default {
  name: 'App',
  components: {
    ToolBar,
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
