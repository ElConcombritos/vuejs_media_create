<template>
  <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
       y="0px" width="100%" height="100%"
       viewBox="0 0 512.002 512.002" style="enable-background:new 0 0 512.002 512.002;" xml:space="preserve"
       v-click-outside="onClickOutside" v-on:dblclick="selectElement" v-bind:fill="this.Element.color">
      <g>
        <g>
          <path d="M490,474.459H0L245.009,15.541L490,474.459z"/>
        </g>
      </g>

</svg>
</template>

<script>
import vClickOutside from "v-click-outside";

export default {
  name: "TriangleForm",
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
}
</script>

<style scoped>

</style>
