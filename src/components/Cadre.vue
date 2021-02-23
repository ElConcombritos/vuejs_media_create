<template>
  <div
      style="font-size:10%;height: 540px; width: 960px; border: 1px solid #ff0000; position: relative;" @click="SetFalseForAllTextEditor">
    <!--<Element v-bind:grid="[20,20]" msg="truc 1"/>
    <Element v-bind:grid="[80,80]" msg="truc 2"/>
    <Element v-bind:grid="[1,1]" msg="truc 3"/>-->
    <Element v-for="Element in Elements" :key="Element.id"
             :Element="Element"/>
    <text-editor v-on:dblclicked="onClicktextEditor" v-for="text in Texts" :key="text.id"
             :text="text"/>
  </div>
</template>

<script>

const Texts = [
  {
    id: 0,
    clicked : false,
  },
]

const Elements = [
  {
    id: 1,
    grid: [20, 20],
    x: 100,
    y: 100,
    h: 100,
    w: 100,
    clicked : false,
    code:"<p>Truc 1</p>",
  }, {
    id: 2,
    grid: [1, 1],
    x: 400,
    y: 400,
    h: 100,
    w: 100,
    code:"<p>Truc 2</p>"

  }, {
    id: 3,
    grid: [1, 1],
    x: 600,
    y: 100,
    h: 100,
    w: 100,
    code:"<p>Truc 3</p>"

  }, {
    id: 4,
    grid: [1, 1],
    x: 200,
    y: 200,
    h: 100,
    w: 100,
    code:'<img style="width:100%;height:100%" src="https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg">'

  },
  {
    id: 5,
    grid: [1, 1],
    x: 400,
    y: 300,
    h: 100,
    w: 100,
    code:'<img style="width:100%;height:100%" src="https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg">'

  },
]

import TextEditor from "@/components/TextEditor";
import Element from './Element.vue'

export default {
  name: "Cadre",
  components: {
    TextEditor,
    Element
  },
  data: function () {
    return {
      Texts,
      Elements,
    };
  },
  methods : {
    SetFalseForAllTextEditor : function() {
      //this.$set(this.Texts[0],'clicked', false)
    },
    onClicktextEditor : function(idText) { //idText = l'id correspondant à l'editor dans le tableau Text
      console.log("select")
      this.$set(this.Texts[idText],'clicked', true)

    }
  }
}
</script>

<style scoped>

</style>
