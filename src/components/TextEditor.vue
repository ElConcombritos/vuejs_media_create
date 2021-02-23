<template>
  <vue-draggable-resizable :w="300" :h="200" :x="600" :y="200" :drag-cancel="'.cancel'" :parent="true" >
  <div v-on:dblclick="$emit('dblclicked', Text.id)"  class="editor" v-bind:class="{ 'cancel': Text.clicked }">
    <editor-menu-bubble :editor="editor" :keep-in-bounds="keepInBounds" v-slot="{ commands, isActive, menu }">
      <div
          class="menububble"
          :class="{ 'is-active': menu.isActive }"
          :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
      >

        <button
            class="menububble__button"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
        >
          <icon name="bold" />
        </button>

        <button
            class="menububble__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
        >
          <icon name="italic" />
        </button>

        <button
            class="menububble__button"
            :class="{ 'is-active': isActive.code() }"
            @click="commands.code"
        >
          <icon name="code" />
        </button>

      </div>
    </editor-menu-bubble>

    <editor-content class="editor__content" :editor="editor" />

  </div>
</vue-draggable-resizable>
</template>

<script>
import Icon from './Icon.vue'
import { Editor, EditorContent, EditorMenuBubble } from 'tiptap'
import {
  Blockquote,
  BulletList,
  CodeBlock,
  HardBreak,
  Heading,
  ListItem,
  OrderedList,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions'
import ClickOutside from 'vue-click-outside'


export default {
  name : "TextEditor",
  props: {
    Text: Object
  },
  components: {
    EditorContent,
    EditorMenuBubble,
    Icon,
  },
  methods : {
    selectElement : function() {
      console.log("double clicked")
      this.$emit('dblclicked', this.Text.id)
    },

  },
  data() {
    return {
      //############################## PARTIE POUR GERER LE CLIC SUR L'ELEMENT ET ACTIVER L'EDITION DE TEXTE ########################################
      isClicked:false,
      keepInBounds: true,
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
        ],
        content: `
          <h2>
            Menu Bubble
          </h2>
          <p>
            Hey, try to select some text here. There will popup a menu for selecting some inline styles. <em>Remember:</em> you have full control about content and styling of this menu.
          </p>
        `,
      }),
    }
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  mounted() {
    this.popupItem = this.$el
  },
  directives: {
    ClickOutside
  }
}
</script>


<style scoped lang="scss">
@import "../assets/sass/main.scss";
</style>
