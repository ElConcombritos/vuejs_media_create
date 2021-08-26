<template>
  <vue-draggable-resizable :z="this.Element.zindex" :x="this.widthCadre/Element.x" :y="this.heightCadre/Element.y" :w="this.widthCadre/Element.w"
                           :h="this.heightCadre/Element.h" :lock-aspect-ratio="Element.ratio" @dragstop="onDrag"
                           @resizestop="onResize" :parent="true" :style="style"
                           :drag-cancel="'.cancel'">
    <div style="height: 100%" v-if="Element.type === 'image'">
      <ImageElement v-on:selectElement="selectElement"
                    v-on:unselectElement="unselectElement"
                    :Element="Element"></ImageElement>
    </div>
    <div style="height: 100%" v-if="Element.type === 'circle'">
      <circle-form :Element="Element" v-on:selectElement="selectElement"
                   v-on:unselectElement="unselectElement"></circle-form>
    </div>
    <div style="height: 100%" v-if="Element.type === 'rect'">
      <rect-form :Element="Element" v-on:selectElement="selectElement"
                 v-on:unselectElement="unselectElement"></rect-form>
    </div>
    <div style="height: 100%" v-if="Element.type === 'poly'">
      <poly-form v-bind:heightCadre="heightCadre" v-bind:widthCadre="widthCadre" :Poly="Element"></poly-form>
    </div>
    <div style="height: 100%" v-if="Element.type === 'star'">
      <star-form :Element="Element" v-on:selectElement="selectElement"
                 v-on:unselectElement="unselectElement">
      </star-form>
    </div>
    <div style="height: 100%" v-if="Element.type === 'triangle'">
      <triangle-form :Element="Element" v-on:selectElement="selectElement"
                 v-on:unselectElement="unselectElement">
      </triangle-form>
    </div>
    <div style="height: 100%" v-if="Element.type === 'banana'">
      <banana-form :Element="Element"></banana-form>
    </div>
    <div style="height: 100%" v-if="Element.type === 'text'">
      <TextEditor v-on:changeContent="changeContent" v-on:selectedTextEditor="selectedTextEditor"
                  v-on:unselectedTextEditor="unselectedTextEditor" :Text="Element"></TextEditor>
    </div>

    <!-- MODULE -->

    <div style="height: 100%" v-if="Element.type === 'accident'">
    <accident :Element="Element"></accident>
  </div>
  </vue-draggable-resizable>
</template>
<script>

import ImageElement from "@/components/ImageElement";
import TextEditor from "@/components/TextEditor";
import CircleForm from "@/components/form/CircleForm";
import RectForm from "@/components/form/RectForm";
import PolyForm from "@/components/form/PolyForm";
import StarForm from "@/components/form/StarForm";
import BananaForm from "@/components/form/BananaForm";
import TriangleForm from "@/components/form/TriangleForm";
import Accident from "@/components/module/Accident";

export default {
  name: "Element",
  components: {Accident, TriangleForm, BananaForm, StarForm, PolyForm, RectForm, CircleForm, TextEditor, ImageElement},
  props: {
    Element: Object,
    widthCadre: Number,
    heightCadre: Number,
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
    //PARTIE POUR INFORMER LE CADRE DU CHANGEMENT DE POSITION/TAILLE D'UN ELEMENT
    onResize: function (x, y, width, height) {
      this.x = this.widthCadre / x
      this.y = this.heightCadre / y
      this.width = this.widthCadre / width
      this.height = this.heightCadre / height
      this.$emit("onElementResize", this.Element.id, this.x, this.y, this.width, this.height)
    },
    onDrag: function (x, y) {
      console.log(x,y)
      if (x === 0) x = 0.1
      if (y === 0) y = 0.1
      this.x = this.widthCadre / x
      this.y = this.heightCadre / y
      this.$emit("onElementDrag", this.Element.id, this.x, this.y)
    },
    selectElement: function (idElement) {
      this.$emit("selectElement", idElement)
    },
    unselectElement: function (idElement) {
      this.$emit("unselectElement", idElement)
    },
    selectedTextEditor: function (idText) {
      this.$emit("selectedTextEditor", idText)
    },
    unselectedTextEditor: function (idText) {
      this.$emit("unselectedTextEditor", idText)
    },
    changeContent(html, idText) {
      this.$emit("changeContent", html, idText)
      //this.content = html
    }
    //PARTIE POUR INFORMER LE CADRE DU CHANGEMENT DE POSITION/TAILLE D'UN ELEMENT
  },
  computed: {
    style() {
      if (this.Element.hover){
        return "outline : 1px solid black"
      }
      else {
        return ""
      }
    }
  }
}
</script>
