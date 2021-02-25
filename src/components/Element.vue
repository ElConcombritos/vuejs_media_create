<template>
    <vue-draggable-resizable :w="Element.w" :h="Element.h" :x="Element.x" :y="Element.y" :grid="Element.grid" @dragging="onDrag" @resizing="onResize" :parent="true">
      <div style="height: 100%;width:100%" v-html="Element.code"> </div>
    </vue-draggable-resizable>
</template>

<script>

export default {
  name:"Element",
  props: {
    Element: Object
  },
  data: function () {
    return {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      rotation:0
    }
  },
  methods: {
    //PARTIE POUR INFORMER LE CADRE DU CHANGEMENT DE POSITION/TAILLE D'UN ELEMENT
    onResize: function (x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
      this.$emit("onElementResize",this.Element.id, x,y,width,height)

    },
    onDrag: function (x, y) {
      console.log("drag ses morts")
      this.x = x
      this.y = y
      this.$emit("onElementDrag",this.Element.id, x,y)
    },
    //PARTIE POUR INFORMER LE CADRE DU CHANGEMENT DE POSITION/TAILLE D'UN ELEMENT

  }
}
</script>
