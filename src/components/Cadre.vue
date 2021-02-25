<template>
  <div>
    <div
        style="font-size:10%;height: 540px; width: 960px; border: 1px solid #ff0000; position: relative;"
    >
      <!--<Element v-bind:grid="[20,20]" msg="truc 1"/>
      <Element v-bind:grid="[80,80]" msg="truc 2"/>
      <Element v-bind:grid="[1,1]" msg="truc 3"/>-->
      <Element v-for="Element in Elements" :key="Element.id"
               :Element="Element"/>
      <text-editor v-on:changeContent="changeContent" v-on:selectedTextEditor="selectedTextEditor"
                   v-on:unselectedTextEditor="unselectedTextEditor" v-for="text in Texts" :key="text.id"
                   :text="text"/>
    </div>
    <button @click="saveTexts">Save</button>
    <button @click="loadTexts">Load</button>
  </div>
</template>

<script>

import axios from "axios";

const Texts = [
  {
    id: 0,
    content: ""
  },
  {
    id: 1,
    content: ""
  },
]

const Elements = [
  {
    id: 0,
    grid: [1, 1],
    x: 200,
    y: 200,
    h: 100,
    w: 100,
    code: '<img style="width:100%;height:100%" src="https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg">'

  },
  {
    id: 1,
    grid: [1, 1],
    x: 400,
    y: 300,
    h: 100,
    w: 100,
    code: '<img style="width:100%;height:100%" src="https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg">'

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
  methods: {
    selectedTextEditor: function (idText) {
      this.$emit("selectedTextEditor", idText)
    },
    unselectedTextEditor: function (idText) {
      this.$emit("unselectedTextEditor", idText)
    },
    changeContent(html, idText) {
      //this.$set(this.Texts[idText], 'clicked', true)
      console.log(html + idText);
      this.$set(this.Texts[idText], 'content', html)
    },
    saveTexts: async function () {
      let json = JSON.stringify(this.Texts);
      console.log(json);
      const jsonPost = {action: 'save', json: json};
      axios.post('http://back.test/back.php', jsonPost)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

    }, loadTexts: function () {
      const jsonPost = {action: 'load'};
      let fuck = this;
      axios.post('http://back.test/back.php', jsonPost)
          .then(function (response) {
            let res = JSON.parse(response.data);
            for(let i in res) {
              fuck.$set(Texts[res[i].id], 'content', res[i].content)

            }




          })
          .catch(function (error) {
            console.log(error);
          });


    },
  }
}
</script>

<style scoped>

</style>
