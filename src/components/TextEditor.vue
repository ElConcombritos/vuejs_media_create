<template>

    <div v-click-outside="onClickOutside" style="height:100%" v-on:dblclick="selectElement()"
         v-bind:class="{ 'cancel': this.isClicked,'selected' : this.isClicked }">
      <quill-editor style="height: 100%"
                    ref="quillEditor"
                    class="editor"
                    v-model="this.Text.content"
                    :options="editorOption"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)"
                    @change="onEditorChange($event)"
      />
      <br>
    </div>
</template>

<script>

import {Quill} from 'vue-quill-editor'

// Add fonts to whitelist
let Font = Quill.import('formats/font');
// We do not add Sans Serif since it is the default
Font.whitelist = ['roboto', 'tangerine', 'anton'];
Quill.register(Font, true);

var Size = Quill.import('attributors/style/size');
Size.whitelist = ['14px', '16px', '18px','30px'];
Quill.register(Size, true);

import vClickOutside from 'v-click-outside'

/*const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];*/


export default {
  props: {
    Text: Object,
    widthCadre: Number,
    heightCadre: Number,
  },
  data() {
    return {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      rotation: 0,
      isClicked: false,
      //toolbar: ".toolbar" + this.Text.id,//marche pas quand on l'utilise pour définir le container de la toolbar
      editorOption: {
        theme: 'snow',
        modules: {
          toolbar: ".toolbar" + this.Text.id,//mais ça ça marche, c'est suspect
          //toolbar: toolbarOptions,
        },
      }
    };
  },
  methods: {
    selectElement: function () {
      this.$emit("selectedTextEditor", this.Text.id)
      this.isClicked = true;
    },
    unselectElement: function () {
      //this.isClicked = false;
    },
    onClickOutside(event) {
      let isClickInToolbar = false;
      for (let i in event.path) {
        if (event.path[i].id != undefined) {
          if (event.path[i].id == "toolbar") {
            isClickInToolbar = true;
          }
        }
      }
      if (!isClickInToolbar) {
        this.isClicked = false;
        this.$emit("unselectedTextEditor", this.Text.id)
      }

    },
    //PARTIE POUR INFORMER LE CADRE DU CHANGEMENT DE POSITION/TAILLE D'UN ELEMENT
    onResize: function (x, y, width, height) {
      this.x = this.widthCadre / x
      this.y = this.heightCadre / y
      this.width = this.widthCadre / width
      this.height = this.heightCadre / height
      this.$emit("onTextResize", this.Text.id, this.x, this.y, this.width, this.height)

    },
    onDrag: function (x, y) {
      this.x = this.widthCadre / x
      this.y = this.heightCadre / y
      this.$emit("onTextDrag", this.Text.id, this.x, this.y)

    },
    //PARTIE POUR INFORMER LE CADRE DU CHANGEMENT DE POSITION/TAILLE D'UN ELEMENT

    onEditorBlur(quill) {
    },
    onEditorFocus(quill) {
    },
    onEditorReady(quill) {
    },
    onEditorChange({quill, html, text}) {
      this.$emit("changeContent", html, this.Text.id)
      //this.content = html
    }
  },
  computed: {
    editor() {
      return this.$refs.quillEditor.quill
    }
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
}
</script>

<style>
@import "../assets/css/fonts.css";


.ql-tooltip {
  width: 1000px !important;
  position: absolute;
  margin-top: 10%;
}

.selected {
  border: 1px solid blue;
}

.ql-picker-item ql-primary {
  border: 1px solid black !important;
}

.ql-formats {
  display: block !important;
}


</style>
