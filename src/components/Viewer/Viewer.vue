<template>
  <div>
    <b-container class="bv-example-row" style="max-width: 100% !important;">
      <b-row>
        <b-col cols="6">
          <div class="cadre"
               style="font-size:10%;border: 1px solid #ff0000; position: relative;"
               :style="style">
            <ViewerElement v-for="Element in Elements" :key="Element.id"
                     :Element="Element"
                     v-bind:widthCadre="widthCadre"
                     v-bind:heightCadre="heightCadre"

            />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>

import axios from "axios";
import ToolBar from "@/components/ToolBar";
import ViewerElement from "@/components/Viewer/ViewerElement";

const oldElements = []
const baseElements = []
const savedElements = []


let Elements = [
  {
    id: 0,
    grid: [1, 1],
    x: 3.910386965376782,
    y: 1.241914618369987,
    w: 2.0869565217391304,
    h: 13.846153846153847,
    type: "image",
    ratio: false,
    code: '<img style="width:100%;height:100%" src="https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg">',
    toolbarVisibility: "none",
    zindex: 1,
    hover: false,
  },
  {
    id: 1,
    grid: [1, 1],
    x: 3.910386965376782,
    y: 1.241914618369987,
    w: 2.0869565217391304,
    h: 13.846153846153847,
    type: "image",
    ratio: false,
    code: '<img style="width:100%;height:100%" src="https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg">',
    toolbarVisibility: "none",
    zindex: 1,
    hover: false,
  },
  {
    id: 2,
    x: 3.910386965376782,
    y: 1.241914618369987,
    w: 2.0869565217391304,
    h: 13.846153846153847,
    content: "",
    type: "text",
    ratio: false,
    toolbarVisibility: "none",
    color: "hsl(0,61%,48%)",
    zindex: 1,
    hover: false,
  },
  {
    id: 3,
    x: 3.910386965376782,
    y: 1.241914618369987,
    w: 2.0869565217391304,
    h: 13.846153846153847,
    content: "",
    type: "text",
    ratio: false,
    toolbarVisibility: "none",
    zindex: 1,
    hover: false,
  },
  {
    id: 4,
    x: 4,
    y: 4,
    w: 3.8,
    h: 2.15,
    content: "",
    type: "star",
    ratio: true,
    toolbarVisibility: "none",
    color: 'hsl(150,61%,48%)',
    zindex: 1,
    hover: false,
  },

]


export default {
  name: "Cadre",
  components: {
    //Rectangle,
    //TextEditor,
    ViewerElement,
  },
  props: {
    widthCadre: Number,
    heightCadre: Number,
  },
  data: function () {
    return {
      Elements,
      oldElements,
      savedElements,
      savedRedoElements : [],
      baseElements,
      poly: false,
      circle: false,
      rect: false,
      zindex: -1,
      drawing: false,
      isUndoing: false,
      undoableProps: ['x', 'y', 'w', 'h', 'color', 'zindex', 'content']
    };
  },
  methods: {
    undo: function () {
      if (this.savedElements.length > 0) {
        this.savedRedoElements.push(JSON.parse(JSON.stringify(this.Elements)))
        this.Elements = JSON.parse(JSON.stringify(this.savedElements.pop()))
        if (this.savedElements.length === 0) {
          this.oldElements = JSON.parse(JSON.stringify(this.baseElements))
        }
      }
    },
    redo: function () {
      if (this.savedRedoElements.length > 0) {
        this.savedElements.push(JSON.parse(JSON.stringify(this.Elements)))
        this.Elements = JSON.parse(JSON.stringify(this.savedRedoElements.pop()))
      }
    },
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
    createStar: function () {
      let id = this.Elements.length;
      console.log("length of elements")
      console.log(id)
      let star = {
        id: id,
        x: 4,
        y: 4,
        w: 6.31,
        h: 3.55,
        content: "",
        type: "star",
        toolbarVisibility: "none",
        ratio: "true",
        color: "hsl(0,0%,0%)",
        hover: false,
        zindex: 1,

      }
      this.Elements.push(star)
      this.saveUndo()
    },
    createTriangle: function () {
      let id = this.Elements.length;
      let triangle = {
        id: id,
        x: 4,
        y: 4,
        w: 6.31,
        h: 3.55,
        content: "",
        type: "triangle",
        toolbarVisibility: "none",
        ratio: "true",
        color: "hsl(0,0%,0%)",
        hover: false,
        zindex: 1,

      }
      this.Elements.push(triangle)
      this.saveUndo()

    },
    saveUndo : function() {
      this.savedElements.push(JSON.parse(JSON.stringify(this.oldElements)))
      this.oldElements = JSON.parse(JSON.stringify(this.Elements))
      this.savedRedoElements = []
    },
    newValue: function (key, value, idElement) {
      let isChanged = false
      if (value !== this.Elements[idElement][key]) isChanged = true
      this.$set(this.Elements[idElement], key, value)
      if (isChanged) {
        this.saveUndo()
      }
    },
    selectElement: function (idElement) {
      for (let i = 0; i < this.Elements.length; i++) {
        this.$set(this.Elements[i], 'toolbarVisibility', "none")
      }
      this.$set(this.Elements[idElement], 'toolbarVisibility', "block")
    },
    unselectElement: function (idText) {
      this.$set(this.Elements[idText], 'toolbarVisibility', "none")

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
      let isChanged = false;
      if (html !== this.Elements[idText]['content']) isChanged = true
      this.$set(this.Elements[idText], 'content', html)
      if (isChanged) {
        this.saveUndo()

      }
    },
    onElementDrag: function (idElement, x, y) {
      let isChanged = false;
      if (x !== this.Elements[idElement]['x']) isChanged = true
      if (y !== this.Elements[idElement]['y']) isChanged = true
      this.$set(this.Elements[idElement], 'x', x)
      this.$set(this.Elements[idElement], 'y', y)
      if (isChanged) {
        this.saveUndo()

      }
    },
    onElementResize: function (idElement, x, y, width, height) {
      let isChanged = false;
      if (x !== this.Elements[idElement]['x']) isChanged = true
      if (y !== this.Elements[idElement]['y']) isChanged = true
      if (width !== this.Elements[idElement]['w']) isChanged = true
      if (height !== this.Elements[idElement]['h']) isChanged = true
      this.$set(this.Elements[idElement], 'x', x)
      this.$set(this.Elements[idElement], 'y', y)
      this.$set(this.Elements[idElement], 'w', width)
      this.$set(this.Elements[idElement], 'h', height)
      console.log("resize")
      if (isChanged) {
        this.saveUndo()

      }
    },
    onNewCircle: function (cx, cy, rw, rh) {
      let id = this.Elements.length;
      let circle = {
        id: id,
        x: cx,
        y: cy,
        w: rw,
        h: rh,
        content: "",
        type: "circle",
        toolbarVisibility: "none",
        color: "hsl(0,0%,0%)",
        hover: false,
        zindex: 1
      }
      this.Elements.push(circle)
      this.zindex = -1
      this.drawing = false
      this.saveUndo()

    },
    onNewRect: function (x, y, w, h) {
      let id = this.Elements.length;
      let rect = {
        id: id,
        x: x,
        y: y,
        w: w,
        h: h,
        content: "",
        type: "rect",
        toolbarVisibility: "none",
        color: "hsl(0,0%,0%)",
        hover: false,
        zindex: 1
      }
      this.Elements.push(rect)
      this.zindex = -1
      this.drawing = false
      this.saveUndo()

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
      let id = this.Elements.length;
      let poly = {
        id: id,
        x: x,
        y: y,
        w: w,
        h: h,
        viewPort: {x: maxX, y: maxY},
        content: "",
        type: "poly",
        path: path,
        toolbarVisibility: "none",
        color: "hsl(0,0%,0%)",
        hover: false,
      }
      this.Elements.push(poly)
      this.zindex = -1
      this.drawing = false

    },
    emptyArrays: function () {
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
  },
  computed: {
    style() {
      return 'width: ' + this.widthCadre + "px;" + 'height: ' + this.heightCadre + "px;" + 'font-size: ' + this.widthCadre / 96 + "px;"
    },
    styleCanvas() {
      return 'width: ' + this.widthCadre + "px;" + 'height: ' + this.heightCadre + "px;" + 'font-size: ' + this.widthCadre / 96 + "px;" + 'z-index: ' + this.zindex
    }
  },
  mounted() {
    this.oldElements = JSON.parse(JSON.stringify(this.Elements))
    this.baseElements = JSON.parse(JSON.stringify(this.Elements))
  }
}
</script>

<style scoped>

</style>
