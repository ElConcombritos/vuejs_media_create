<template>
  <div id="toolbar" style="font-size: 15px">
    <div class="d-flex flex-row">
      <div class=""><p style="display: flex">Couleur de la forme : </p></div>
      <div class=""><color-picker v-on:newColor="newColor" :Element="this.Element"></color-picker></div>
       <!--<div class="p-2"><verte v-model="tmp_color" @mousedown="changeColor" model="hsl"></verte></div>-->
      <!-- <chrome :value="colors" @mouseup="changeColor"></chrome>-->

     </div>
    </div>
  </template>

  <script>

  import 'verte/dist/verte.css';
  import { Chrome } from 'vue-color'
  import ColorPicker from "@/components/toolbar/ColorPicker";

  export default {
    name: "ToolbarForm",
    components: {ColorPicker},
    props: {
      Element: Object
    },
    data() {
      return {
        tmp_color:this.Element.color,
        color: this.Element.color,
        colors : this.Element.color,
      }
    },
    watch: {

    },
    methods: {
      newColor : function(value) {
        this.color = this.tmp_color
        this.$emit("newColor","color",value,this.Element.id)

      }
    }

  }
  </script>

  <style scoped>

  </style>
