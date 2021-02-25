<template>
  <vue-draggable-resizable v-on:click="selectElement()" :drag-cancel="'.cancel'" :resizable="true" :draggable="true"
                           :parent="true">
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
  </vue-draggable-resizable>
</template>

<script>

import { Quill } from 'vue-quill-editor'

// Add fonts to whitelist
let Font = Quill.import('formats/font');
// We do not add Sans Serif since it is the default
Font.whitelist = ['inconsolata', 'tangerine', 'mirza', 'arial'];
Quill.register(Font, true);

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
  },
  data() {
    return {
      isClicked: false,
      toolbar: ".toolbar" + this.Text.id,//marche pas quand on l'utilise pour définir le container de la toolbar
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
      console.log('selected')
      console.log(this.toolbar)
      this.$emit("selectedTextEditor", this.Text.id)
      this.isClicked = true;
    },
    unselectElement: function () {
      console.log('unselected')
      //this.isClicked = false;
    },
    onClickOutside(event) {
      console.log('Clicked outside. Event: ', event)
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
    onEditorBlur(quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus(quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady(quill) {
      console.log('editor ready!', quill)
    },
    onEditorChange({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.$emit("changeContent",html,this.Text.id)
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
  border : 1px solid blue;
}

.ql-picker-item ql-primary {
  border: 1px solid black !important;
}
.ql-formats {
  display: block !important;
}


</style>
