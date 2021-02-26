<template>
  <vue-draggable-resizable :x="this.widthCadre/Element.x" :y="this.heightCadre/Element.y" :w="this.widthCadre/Element.w"
                           :h="this.heightCadre/Element.h" @dragging="onDrag" @resizing="onResize" :parent="true"
                           :drag-cancel="'.cancel'">
    <div style="height: 100%" v-if="Element.type === 'image'">
      <ImageElement :Element="Element"></ImageElement>
    </div>
    <div style="height: 100%" v-if="Element.type === 'text'">
      <TextEditor v-on:changeContent="changeContent" v-on:selectedTextEditor="selectedTextEditor"
                  v-on:unselectedTextEditor="unselectedTextEditor" :Text="Element"></TextEditor>
    </div>
  </vue-draggable-resizable>
</template>
<script>

import ImageElement from "@/components/ImageElement";
import TextEditor from "@/components/TextEditor";

export default {
  name: "Element",
  components: {TextEditor, ImageElement},
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
      this.x = this.widthCadre / x
      this.y = this.heightCadre / y
      this.$emit("onElementDrag", this.Element.id, this.x, this.y)
    },
    selectedTextEditor: function (idText) {
      this.$emit("selectedTextEditor", idText)
    },
    unselectedTextEditor: function (idText) {
      console.log("coucou les pd hihihi")
      this.$emit("unselectedTextEditor", idText)
    },
    changeContent(html, idText) {
      this.$emit("changeContent", html, idText)
      //this.content = html
    }
    //PARTIE POUR INFORMER LE CADRE DU CHANGEMENT DE POSITION/TAILLE D'UN ELEMENT
  }
}
</script>
