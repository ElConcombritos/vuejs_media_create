<template>
    <div id="toolbar" :class="'toolbar'+Element.id" style="width: 45%" :style="style">
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
      <button class="ql-italic"></button>
      <button class="ql-underline"></button>

      <!-- Add subscript and superscript buttons -->
      <button class="ql-script" value="sub"></button>
      <button class="ql-script" value="super"></button>
      <select class="ql-color" title="Colour">
        <option value="rgb(255,0,0)"/>
        <option value="rgb(0,255,0)"/>
        <option value="rgb(0,0,255)"/>
        <option value="rgb(0,0,0)"/>
        <option value="rgb(255,255,255)"/>
        <option value="rgb(255,255,0)"/>
        <option value="rgb(0,255,0)"/>
        <option value="rgb(255,0,255)"/>
      </select>
      <select class="ql-background" title="Colour">
        <option value="rgb(255,0,0)"/>
        <option value="rgb(0,255,0)"/>
        <option value="rgb(0,0,255)"/>
        <option value="rgb(0,0,0)"/>
        <option value="rgb(255,255,255)"/>
        <option value="rgb(255,255,0)"/>
        <option value="rgb(0,255,0)"/>
        <option value="rgb(255,0,255)"/>
      </select>
      <span class="ql-formats">
    <button class="ql-align" value=""></button>
    <button class="ql-align" value="center"></button>
    <button class="ql-align" value="right"></button>
    <button class="ql-align" value="justify"></button>
  </span>
      <span class="ql-formats">
			<select class="ql-font">
				<option value="sans-serif">Sans Serif</option>
        <option value="tangerine">Tangerine</option>
        <option value="anton">Anton</option>
        <option value="roboto">Roboto</option>

			</select>
		</span>
      <span class="ql-format-group">
          <select title="Size" class="ql-size">
            <option value="14px">Small</option>
            <option value="16px">Normal</option>
            <option value="18px">Large</option>
            <option value="30px">Huge</option>
          </select>
        </span>
      <span class="ql-formats">
			<button type="button" class="ql-list" value="bullet">
			</button>
			<button type="button" class="ql-list" value="ordered">
			</button>
		</span>
    </div>
</template>

<script>

export default {
  name: "ToolBarText",
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
    style() {
      return 'display: ' + this.Element.toolbarVisibility + " !important";
    }
  },
}
</script>

<style>
@import "../../assets/css/fonts.css";


</style>
