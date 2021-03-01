<template>
  <div>
    <div style="float:left">
      <button @click="select">Select</button>
      <button @click="rectTrue">Rect</button>
      <button @click="circleTrue">Circle</button>
      <button @click="polyTrue">Poly</button>
    </div>
    <div style="display: flex">

      <CanvasDraw class="canvas" style="font-size:10%;border: 1px solid #ff0000; position: absolute"
                  :style="styleCanvas" v-bind:widthCadre="widthCadre" v-on:newCircle="onNewCircle"
                  v-bind:isDrawing="this.drawing"
                  v-on:newRect="onNewRect"
                  v-on:newPoly="onNewPoly"
                  v-bind:heightCadre="heightCadre" v-bind:rect="rect" v-bind:circle="circle" v-bind:poly="poly">
      </CanvasDraw>
      <div class="cadre"
           style="font-size:10%;border: 1px solid #ff0000; position: relative;"
           :style="style"
      >
        <!--<Element v-bind:grid="[20,20]" msg="truc 1"/>
        <Element v-bind:grid="[80,80]" msg="truc 2"/>
        <Element v-bind:grid="[1,1]" msg="truc 3"/>-->
        <Element v-for="Element in Elements" :key="Element.id" v-on:onElementDrag="onElementDrag"
                 v-on:changeContent="changeContent"
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
    <div>
      <button>Rectangle</button>
    </div>
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
  {
    id: 4,
    x: 3.910386965376782,
    y: 1.241914618369987,
    w: 2.0869565217391304,
    h: 13.846153846153847,
    content: "",
    type: "star",
    toolbarVisibility: "none",
  },

  {
    id: 5,
    x: 3.910386965376782,
    y: 1.241914618369987,
    w: 2.0869565217391304,
    h: 13.846153846153847,
    content: "",
    type: "banana",
    toolbarVisibility: "none",
  },


]

import Element from './Element.vue'
import CanvasDraw from "@/components/CanvasDraw";

export default {
  name: "Cadre",
  components: {
    //Rectangle,
    //TextEditor,
    Element,
    ToolBar,
    CanvasDraw
  },
  props: {
    widthCadre: Number,
    heightCadre: Number,
  },
  data: function () {
    return {
      Texts,
      Elements,
      poly: false,
      circle: false,
      rect: false,
      zindex: -1,
      drawing: false,
    };
  },
  methods: {
    select: function () {
      this.poly = false;
      this.rect = false
      this.circle = false;
      this.zindex = -1
    },
    rectTrue: function () {
      this.poly = false;
      this.rect = true
      this.circle = false;
      this.drawing = true;
      this.zindex = 4000
    },
    circleTrue: function () {
      this.poly = false;
      this.rect = false
      this.circle = true;
      this.drawing = true;
      this.zindex = 4000
    },

    polyTrue: function () {
      this.poly = true;
      this.rect = false
      this.circle = false;
      this.drawing = true;
      this.zindex = 4000
    },
    selectedTextEditor: function (idText) {
      for (let i = 0; i < this.Texts.length; i++) {
        this.$set(this.Elements[i], 'toolbarVisibility', "none")

      }
      this.$set(this.Elements[idText], 'toolbarVisibility', "block")

    },
    unselectedTextEditor: function (idText) {
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
    onNewCircle: function (cx, cy, rw, rh) {
      let id = Elements.length;
      let circle = {
        id: id,
        x: cx,
        y: cy,
        w: rw,
        h: rh,
        content: "",
        type: "circle",
        toolbarVisibility: "none",
      }
      this.Elements.push(circle)
      this.zindex = -1
      this.drawing = false
    },
    onNewRect: function (x, y, w, h) {
      let id = Elements.length;
      let circle = {
        id: id,
        x: x,
        y: y,
        w: w,
        h: h,
        content: "",
        type: "rect",
        toolbarVisibility: "none",
      }
      this.Elements.push(circle)
      this.zindex = -1
      this.drawing = false
    },
    onNewPoly: function (svgPointsArray, x, y, w, h) {
      /** CONVERSION DU POLYGON EN PATH */
      let points = "";
      let maxX = 0
      let maxY = 0
      for (let i of svgPointsArray) {
        if (i.x > maxX) maxX = i.x
        if (i.y > maxY) maxY = i.y
        points += (i.x) + "," + (i.y) + " "
      }
      points = points.slice(0, -1)
      var p = points.split(/\s+/);
      var path = "";
      for (var i = 0, len = p.length; i < len; i++) {
        path += (i && "L" || "M") + p[i]
      }
      /** ################################# */
      let id = Elements.length;
      let poly = {
        id: id,
        x: x,
        y: y,
        w: w,
        h: h,
        viewPort : {x:maxX,y:maxY},
        content: "",
        type: "poly",
        path: path,
        toolbarVisibility: "none",
      }
      this.Elements.push(poly)
      this.zindex = -1
      this.drawing = false

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
      return 'width: ' + this.widthCadre + "px;" + 'height: ' + this.heightCadre + "px;" + 'font-size: ' + this.widthCadre / 96 + "px;"
    },
    styleCanvas() {
      return 'width: ' + this.widthCadre + "px;" + 'height: ' + this.heightCadre + "px;" + 'font-size: ' + this.widthCadre / 96 + "px;" + 'z-index: ' + this.zindex
    }
  },
}
</script>

<style scoped>

</style>
