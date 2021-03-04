<template>
  <div style="height: 100%;width:100%" v-html="Element.code" v-click-outside="onClickOutside" v-on:dblclick="selectElement"></div>
</template>

<script>
import vClickOutside from 'v-click-outside'

export default {
  name: "imageElement",
  props: {
    Element: Object,
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

  },directives: {
    clickOutside: vClickOutside.directive
  },
}
</script>

<style scoped>

</style>
