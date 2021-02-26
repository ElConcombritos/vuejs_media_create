<template>
  <div>

    <div style="display: flex">
      <div class="cadre"
          style="font-size:10%;border: 1px solid #ff0000; position: relative;"
          :style="style"
      >
        <!--<Element v-bind:grid="[20,20]" msg="truc 1"/>
        <Element v-bind:grid="[80,80]" msg="truc 2"/>
        <Element v-bind:grid="[1,1]" msg="truc 3"/>-->
        <Element v-for="Element in Elements" :key="Element.id" v-on:onElementDrag="onElementDrag" v-on:changeContent="changeContent"
                 v-on:onElementResize="onElementResize"
                 :Element="Element"
                 v-bind:widthCadre="widthCadre"
                 v-bind:heightCadre="heightCadre"
                 v-on:selectedTextEditor="selectedTextEditor"
                 v-on:unselectedTextEditor="unselectedTextEditor"
        />


        <!--<text-editor v-on:onTextDrag="onTextDrag" v-on:onTextResize="onTextResize" v-on:changeContent="changeContent"
                     v-on:selectedTextEditor="selectedTextEditor"
                     v-on:unselectedTextEditor="unselectedTextEditor" v-for="text in Texts" :key="text.id"
                     :text="text"
                     v-bind:widthCadre="widthCadre"
                     v-bind:heightCadre="heightCadre"/>-->
      </div>
      <tool-bar v-for="text in Elements" :key="text.id"
                :Element="text"/>
    </div>
    <rectangle></rectangle>
    <button @click="saveElements">Save</button>
    <button @click="loadElement">Load</button>
    <button @click="clear">Clear</button>
  </div>
</template>

<script>

import axios from "axios";
import ToolBar from "@/components/ToolBar";


const Texts = [
  {
    id: 0,
    x: 100,
    y: 100,
    w: 100,
    h: 100,
    content: "",
    toolbarVisibility: "none",
  },
  {
    id: 1,
    x: 100,
    y: 100,
    w: 100,
    h: 100,
    content: "",
    toolbarVisibility: "none",
  },
]

//Exemple structure
/*const EXAMPLE = [
  {
    id: 0,
    x: 100,
    y: 100,
    w: 100,
    h: 100,
    content: "",
    type: "image",
    toolbarVisibility:"none",
  },
  {
    id: 1,
    x: 100,
    y: 100,
    w: 100,
    h: 100,
    content: "",
    type: "text",
  },
]*/

const Elements = [
  {
    id: 0,
    grid: [1, 1],
    x: 3.910386965376782,
    y: 1.241914618369987,
    w: 2.0869565217391304,
    h: 13.846153846153847,
    type: "image",
    code: '<img style="width:100%;height:100%" src="https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg">'
  },
  {
    id: 1,
    grid: [1, 1],
    x: 3.910386965376782,
    y: 1.241914618369987,
    w: 2.0869565217391304,
    h: 13.846153846153847,
    type: "image",
    code: '<img style="width:100%;height:100%" src="https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg">'
  },
  {
    id: 2,
    x: 3.910386965376782,
    y: 1.241914618369987,
    w: 2.0869565217391304,
    h: 13.846153846153847,
    content: "",
    type: "text",
    toolbarVisibility: "none",
  },
  {
    id: 3,
    x: 3.910386965376782,
    y: 1.241914618369987,
    w: 2.0869565217391304,
    h: 13.846153846153847,
    content: "",
    type: "text",
    toolbarVisibility: "none",
  },
]

//import TextEditor from "@/components/TextEditor";
import Element from './Element.vue'
import Rectangle from "@/components/Rectangle";

export default {
  name: "Cadre",
  components: {
    Rectangle,
    //TextEditor,
    Element,
    ToolBar
  },
  props: {
    widthCadre: Number,
    heightCadre: Number,
  },
  data: function () {
    return {
      Texts,
      Elements,
    };
  },
  methods: {
    selectedTextEditor: function (idText) {
      console.log("coucou")
      for (let i = 0; i < this.Texts.length; i++) {
        this.$set(this.Elements[i], 'toolbarVisibility', "none")

      }
      this.$set(this.Elements[idText], 'toolbarVisibility', "block")

    },
    unselectedTextEditor: function (idText) {
      console.log("WSH WSH LES PD")
      this.$set(this.Elements[idText], 'toolbarVisibility', "none")
    },
    changeContent(html, idText) {
      //this.$set(this.Texts[idText], 'clicked', true)
      console.log(html + idText);
      this.$set(this.Elements[idText], 'content', html)
    },
    onTextDrag: function (idText, x, y) {//SERT PU A RIEN
      console.log("drag")
      this.$set(this.Texts[idText], 'x', x)
      this.$set(this.Texts[idText], 'y', y)
    },
    onTextResize: function (idText, x, y, width, height) {//SERT PU A RIEN
      this.$set(this.Texts[idText], 'x', x)
      this.$set(this.Texts[idText], 'y', y)
      this.$set(this.Texts[idText], 'w', width)
      this.$set(this.Texts[idText], 'h', height)
    },
    onElementDrag: function (idElement, x, y) {
      console.log("drag element")
      this.$set(this.Elements[idElement], 'x', x)
      this.$set(this.Elements[idElement], 'y', y)
    },
    onElementResize: function (idElement, x, y, width, height) {
      this.$set(this.Elements[idElement], 'x', x)
      this.$set(this.Elements[idElement], 'y', y)
      this.$set(this.Elements[idElement], 'w', width)
      this.$set(this.Elements[idElement], 'h', height)
    },
    emptyArrays: function () {
      console.log("clear")
      while (this.Elements.length > 0) {
        this.Elements.pop();
      }
      while (this.Texts.length > 0) {
        this.Texts.pop();
      }
    },
    clear: function () {
      this.emptyArrays();
    },
    saveElements: async function () {
      //let textJson = JSON.stringify(this.Texts);
      let ElementJson = JSON.stringify(this.Elements);
      const jsonPost = {action: 'saveElements', 'jsonE': ElementJson};
      axios.post('http://back.test/back.php', jsonPost)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    loadElement: function () {
      const jsonPost = {action: 'loadElements'};
      let fuck = this;
      this.emptyArrays()
      axios.post('http://back.test/back.php', jsonPost)
          .then(function (response) {
            console.log(response);
            let res = JSON.parse(response.data.element);
            for (let i in res) {
              fuck.Elements.push(res[i]);
              //fuck.$set(Texts[res[i].id], 'content', res[i].content)
            }
            res = JSON.parse(response.data.text);
            for (let i in res) {
              fuck.Texts.push(res[i]);
              //fuck.$set(Texts[res[i].id], 'content', res[i].content)
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    //PARTIE POUR SAVE ET LOADER LES JSON AVEC LES INFOS SUR LES ELEMENT/TEXT
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
    },
    loadTexts: function () {
      const jsonPost = {action: 'load'};
      let fuck = this;
      axios.post('http://back.test/back.php', jsonPost)
          .then(function (response) {
            let res = JSON.parse(response.data);
            for (let i in res) {
              fuck.Texts.push({})
              fuck.$set(Texts[res[i].id], 'content', res[i].content)
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
  },
  computed: {
    style() {
      return 'width: ' + this.widthCadre + "px;" + 'height: ' + this.heightCadre + "px;" + 'font-size: ' + this.widthCadre / 96 + "px;";
    }
  },
}
</script>

<style scoped>

</style>
