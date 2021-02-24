<template>
  <div id="app" style="display: flex">
    <Cadre v-on:selectedTextEditor="selectedTextEditor" v-on:unselectedTextEditor="selectedTextEditor"></Cadre>

    <tool-bar v-for="text in Texts" :key="text.id"
              :text="text"/>


  </div>
</template>

<script>
import Cadre from "@/components/Cadre";
import ToolBar from "@/components/ToolBar";

const Texts = [
  {
    id: 0,
    visible: "none",
  },
  {
    id: 1,
    visible: "none",
  },
]

export default {
  name: 'App',
  components: {
    Cadre,
    ToolBar
  },
  data: function () {
    return {
      Texts,
    };
  },
  methods: {
    selectedTextEditor: function (idText) {
      console.log("JE CHANGE LE STYLE HIHI")
      for (let i = 0; i < Texts.length; i++) {
        this.$set(this.Texts[i], 'visible', "none")

      }
      this.$set(this.Texts[idText], 'visible', "block")
    },
    unselectedTextEditor: function (idText) {
      this.$set(this.Texts[idText], 'visible', "none")
    }
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
