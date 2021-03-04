<template>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" v-click-outside="onClickOutside" v-on:dblclick="selectElement" v-bind:fill="this.Element.color"
  height="100%">
    <circle cx="50" cy="50" r="50"/>
  </svg>
</template>

<script>
import vClickOutside from "v-click-outside";

export default {
  name: "Rect",
  data() {
    return {}
  },
  props: {
    Element: Object
  },
  methods: {
    selectElement: function () {
      this.$emit("selectElement", this.Element.id)
      this.isClicked = true;
    },
    unselectElement: function () {
      //this.isClicked = false;
    },
    onClickOutside(event) {
      let isClickInToolbar = false;
      for (let i in event.path) {
        if (event.path[i].id != undefined) {
          if (event.path[i].id == "toolbar") {
            isClickInToolbar = true;
          }
        }
      }
      if (!isClickInToolbar) {
        this.isClicked = false;
        this.$emit("unselectElement", this.Element.id)
      }

    },

  }, directives: {
    clickOutside: vClickOutside.directive
  },
  computed: {
    style() {
      return "fill : " + this.Element.color
    }
  }
}
</script>

<style scoped>

</style>
