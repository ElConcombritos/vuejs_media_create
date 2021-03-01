<template>
  <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%"
       :viewBox="viewbox" preserveAspectRatio="none" xml:space="preserve">
<g>
	<g>
		<path v-bind:d="this.Poly.path"/>
	</g>
</g>

</svg>
</template>


<script>
export default {
  name: "PolyForm",
  props: {
    Poly: Object,
    widthCadre: Number,
    heightCadre: Number,
  },
  computed: {
    viewbox() {
      return "0 0 " + this.Poly.viewPort.x + " " + this.Poly.viewPort.y
    }
  }
}
</script>

<style scoped>

</style>
