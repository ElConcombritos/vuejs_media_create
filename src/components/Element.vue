<template>
    <vue-draggable-resizable :w="100" :h="100" :x="100" :y="100" :grid="grid" @dragging="onDrag" @resizing="onResize" @rotating="onRotate" :parent="true">
      <p>{{ msg }}</p>
    </vue-draggable-resizable>

</template>

<script>

export default {
  name:"Element",
  props: {
    msg: String,
    grid: Array,
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
    onRotate: function () {
      this.rotation= 4000000
    }
  }
}
</script>
