<template>
  <div>
    <div v-if="Element.type === 'text'">
      <tool-bar-text :Element="Element" :class="'toolbar'+Element.id"  :style="style"></tool-bar-text>
    </div>
    <div v-if="Element.type === 'image'">
      <toolbar-image :Element="Element" :class="'toolbar'+Element.id"  :style="style"></toolbar-image>
    </div>
    <div v-if="Element.type === 'rect'">
      <toolbar-form :Element="Element" :class="'toolbar'+Element.id"  :style="style" v-on:newColor="newValue"></toolbar-form>
    </div>
    <div v-if="Element.type === 'circle'">
      <toolbar-form :Element="Element" :class="'toolbar'+Element.id"  :style="style" v-on:newColor="newValue"></toolbar-form>
    </div>
    <div v-if="Element.type === 'star'">
      <toolbar-form :Element="Element" :class="'toolbar'+Element.id"  :style="style" v-on:newColor="newValue"></toolbar-form>
    </div>
  </div>
</template>

<script>

import ToolBarText from "@/components/toolbar/ToolbarText";
import ToolbarImage from "@/components/toolbar/ToolbarImage";
import ToolbarForm from "@/components/toolbar/ToolbarForm";

export default {
  name: "ToolBar",
  components: {ToolbarForm, ToolbarImage, ToolBarText},
  props: {
    Element: Object
  },
  data: function () {
    return {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      rotation: 0
    }
  },
  methods: {
    newValue : function(key,value,idElement) {
      this.$emit("newValue",key,value,idElement)
    }
  },
  computed: {
    style() {
      return 'display: ' + this.Element.toolbarVisibility + " !important";
    }
  },
}
</script>

<style>
@import "../assets/css/fonts.css";


</style>
