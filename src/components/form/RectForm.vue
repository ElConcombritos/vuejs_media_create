<template>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="100%">
    <rect x="0" y="0" width="100" height="100" />
  </svg>
</template>

<script>
export default {
  name: "RectForm",
  data() {
    return {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    }
  },

  props: {
    Circle: Object
  },
  methods: {}
}
</script>

<style scoped>

</style>
