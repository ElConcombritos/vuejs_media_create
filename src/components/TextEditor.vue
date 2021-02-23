<template>
    <vue-draggable-resizable v-on:click="selectElement()" :drag-cancel="'.cancel'" :resizable="true" :draggable="true" :parent="true">
      <div v-click-outside="onClickOutside" style="height:100%" v-on:dblclick="selectElement()" v-bind:class="{ 'cancel': this.isClicked }">
        <ckeditor style="height:100%" :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
      </div>
    </vue-draggable-resizable>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-inline';
import vClickOutside from 'v-click-outside'

export default {
  data() {
    return {
      isClicked : false,
      editor: ClassicEditor,
      editorData: '<p>Content of the editor.</p>',
      editorConfig: {
        fontFamily: {
          options: [
            'default',
            'Ubuntu, Arial, sans-serif',
            'Ubuntu Mono, Courier New, Courier, monospace'
          ]
        },
        toolbar: [ 'bold', 'italic','link','fontFamily' ]
      }
    };
  },
  methods : {
    selectElement : function() {
      console.log('selected')
      this.isClicked = true;
    },
    unselectElement : function() {
      console.log('unselected')
      //this.isClicked = false;
    },
    onClickOutside (event) {
      console.log('Clicked outside. Event: ', event)
      this.isClicked = false;

    }
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
}
</script>
