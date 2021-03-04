<template>
  <div><span class="dot" @click="showPicker" :style="dotStyle"></span>
    <!--<chrome v-click-outside="onClickOutside" style="position:absolute;top:50px; right:50px" :style="style"
            :value="colors"
            @ok="onOk" @cancel="onCancel" ></chrome>-->
    <chrome2 v-on:newColor="newColor" :value="this.colors" v-click-outside="onClickOutside" style="position:absolute;top:50px; right:50px" :style="style"></chrome2>
  </div>

</template>

<script>

import 'verte/dist/verte.css';
import {Chrome} from 'vue-color'
import vClickOutside from "v-click-outside";
import Chrome2 from "@/components/toolbar/chrome2";

export default {
  name: "ColorPicker",
  components: {Chrome2},
  props: {
    Element: Object
  },
  data() {
    return {
      colors: this.Element.color,
      color: this.Element.color,
      display: false
    }
  },
  watch: {
    color: function (newVal, oldVal) { // watch it
    }
  },
  methods: {
    changeColor: function () {
    },
    newColor (value) {
      this.color = value
      this.$emit("newColor",value)
    },
    showPicker() {
      console.log("sombrero")
      this.display = !this.display;
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
       this.display=false
      }

    },
  },
  computed: {
    style() {
      if (this.display) return "display: block";
      else return "display: none";


    },
    dotStyle() {
      return "background-color: " + this.color;
    }
  },
  directives: {
    clickOutside: vClickOutside.directive
  },

}
</script>

<style scoped>
.dot {
  height: 25px;
  width: 25px;
  margin-left: 5px;
  border-radius: 50%;
  display: inline-block;
}
</style>
