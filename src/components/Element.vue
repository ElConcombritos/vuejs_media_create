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
    onResize: function (x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    },
    onDrag: function (x, y) {
      this.x = x
      this.y = y
    },
  }
}
</script>
