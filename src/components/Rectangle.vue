<!-- SERT A RIEN JE CROIS -->
<template>
  <div id="coucou"></div>
</template>

<script src="../assets/scripts/svg.draw.js"></script>

<script>
import SVG from 'svg.js'

export default {
  name: "Rectangle",
  mounted() {
    var draw = SVG().addTo('#coucou').size(300, 300)
    var rect = draw.rect(100, 100).attr({ fill: '#f06' })

  }
}
</script>

<style scoped>

</style>
