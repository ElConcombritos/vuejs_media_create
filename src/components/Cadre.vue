<template>
  <div style="font-size:10%;left:25%;margin-top:10%;height: 540px; width: 960px; border: 1px solid #ff0000; position: relative;">
    <Element v-bind:grid="[20,20]" msg="truc 1"/>
    <Element v-bind:grid="[80,80]" msg="truc 2"/>
    <Element v-bind:grid="[1,1]" msg="truc 3"/>
  </div>
</template>


<script>



import Element from './Element.vue'

export default {
  name: "Cadre",
  components: {
    Element
  }
}
</script>

<style scoped>

</style>
