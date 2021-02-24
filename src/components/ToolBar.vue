<template>
  <div id="toolbar" :class="'toolbar'+Text.id" :style="style">
    <!-- Add font size dropdown -->
    <select class="ql-size">
      <option value="small"></option>
      <!-- Note a missing, thus falsy value, is used to reset to default -->
      <option selected></option>
      <option value="large"></option>
      <option value="huge"></option>
    </select>
    <!-- Add a bold button -->
    <button class="ql-bold"></button>
    <!-- Add subscript and superscript buttons -->
    <button class="ql-script" value="sub"></button>
    <button class="ql-script" value="super"></button>
    <select class="ql-color" title="Colour">
      <option value="rgb(255,0,0)" />
      <option value="rgb(0,255,0)" />
      <option value="rgb(0,0,255)" />
      <option value="rgb(0,0,0)" />
      <option value="rgb(255,255,255)" />
      <option value="rgb(255,255,0)" />
      <option value="rgb(0,255,0)" />
      <option value="rgb(255,0,255)" />
    </select>
  </div>
</template>

<script>

export default {
  name:"ToolBar",
  props: {
    Text: Object
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
  },
  computed: {
    style () {
      return 'display: ' + this.Text.visible + " !important";
    }
  },
}
</script>

<style>
.ql-picker-item ql-primary{
  border: 1px solid black !important;
}
</style>
