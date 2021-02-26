<template>
  <div style="height: 100%;width:100%" v-html="Element.code"> </div>
</template>

<script>
export default {
name: "imageElement",
  props: {
    Element: Object,
  },
}
</script>

<style scoped>

</style>
