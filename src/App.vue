<template>
  <div id="app" >
    <Cadre v-on:selectedTextEditor="selectedTextEditor" v-on:unselectedTextEditor="unselectedTextEditor"></Cadre>




  </div>
</template>

<script>
import Cadre from "@/components/Cadre";

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

  },
  data: function () {
    return {
      Texts,
    };
  },
  methods: {
    selectedTextEditor: function (idText) {
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
