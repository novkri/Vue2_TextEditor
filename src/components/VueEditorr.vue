<template>
<div class="wrapper">
<div class="editor-wrapper">

<div v-if="editor">
  <input type="file" @change="addImage"/>
    <button @click="editor.chain().focus().setTextAlign('left').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
        left
      </button>
      <button @click="editor.chain().focus().setTextAlign('center').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
        center
      </button>
      <button @click="editor.chain().focus().setTextAlign('right').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
        right
      </button>
      <button @click="editor.chain().focus().setTextAlign('justify').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }">
        justify
      </button>

  <menu-bar class="editor__header" :editor="editor" />

  <bubble-menu
      class="bubble-menu"
      :tippy-options="{ duration: 100 }"
      :editor="editor"
      v-if="editor"
    >
      <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
        Bold
      </button>
      <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
        Italic
      </button>
      <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
        Strike
      </button>
    </bubble-menu>

    <floating-menu
      class="floating-menu"
      :tippy-options="{ duration: 100 }"
      :editor="editor"
      v-if="editor"
    >
      <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
        H1
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
        H2
      </button>
      <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
        Bullet List
      </button>
       <!-- <input type="file" @change="addImage"/> -->
    </floating-menu>


  <editor-content :editor="editor" />
</div>
</div>

  <button @click="renderOutput">Render</button>
  <div v-html="htmlContent"></div>

</div>

</template>

<script>
import { Editor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/vue-2'
import { defaultExtensions } from '@tiptap/starter-kit'

import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Image from '@tiptap/extension-image'
import Dropcursor from '@tiptap/extension-dropcursor'
import TextAlign from '@tiptap/extension-text-align'

import MenuBar from './MenuBar.vue'

export default {
  components: {
    EditorContent,
    MenuBar,
    BubbleMenu,
    FloatingMenu,
  },

  data() {
    return {
      editor: null,
      htmlContent: null
    }
  },
  methods: {
    addImage(e) {
      // const url = window.prompt('URL')

      // if (url) {
      //   this.editor.chain().focus().setImage({ src: url }).run()
      // }
      let reader = new FileReader();
      let newEditor = this.editor

      console.log(e);
      let file = e.target.files[0]

      reader.readAsDataURL(file);

      reader.onload = function() {
        console.log(this.editor);
        newEditor.chain().focus().setImage({ src: reader.result}).run()
      };

      // reader.onerror = function() {
      //   console.log(reader.error);
      // };
    },
    renderOutput() {
      this.htmlContent = this.editor.getHTML()
      console.log(this.htmlContent);
    }
  },
  mounted() {
    this.editor = new Editor({
      content: '<p>I’m running tiptap with Vue.js. 🎉</p>',
      // extensions: defaultExtensions(),
      extensions: [
        ...defaultExtensions(),
        TextAlign,
        Document,
        Paragraph,
        Text,
        Image,
        Dropcursor,
      ]
    })
  },

  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>

<style scoped>
.editor {
  display: flex;
  flex-direction: column;
  max-height: 400px;
  color: #0D0D0D;
  background-color: #fff;
  border: 3px solid #0D0D0D;
  border-radius: 0.75rem;
}
.editor__header {
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  flex-wrap: wrap;
  padding: 0.25rem;
  border-bottom: 3px solid #0D0D0D;
}

.editor__content {
  padding: 1.25rem 1rem;
  flex: 1 1 auto;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.editor__footer {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  white-space: nowrap;
  border-top: 3px solid #0D0D0D;
  font-size: 12px;
  font-weight: 600;
  color: #0D0D0D;
  white-space: nowrap;
  padding: 0.25rem 0.75rem;
}

.editor__name button {
  background: none;
  border: none;
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  color: #0D0D0D;
  border-radius: 0.4rem;
  padding: 0.25rem 0.5rem;
}

.editor__name button:hover {
  color: #FFF;
  background-color: #0D0D0D;
}

</style>

<style>
/* wrappers */
.wrapper {
  max-width: 800px;
  margin: auto;
}
.editor-wrapper {
  max-width: 800px;
  margin: auto;
  padding: 1.25rem;
  min-height: 12rem;
  border: 3px solid #0d0d0d;
  border-radius: .75rem;
  margin-bottom: 2rem;
}
/* Basic editor styles */
  .ProseMirror > * + * {
    margin-top: 0.75em;
  }

.ProseMirror-focused  {
  outline: none !important;
}

  .ProseMirror ul,
  .ProseMirror ol {
    padding: 0 1rem;
  }

  .ProseMirror h1,
  .ProseMirror h2,
  .ProseMirror h3,
  .ProseMirror h4,
  .ProseMirror h5,
  .ProseMirror h6 {
    line-height: 1.1;
  }

  .ProseMirror code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  .ProseMirror pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
  }
  .ProseMirror pre code {
    color: inherit;
    padding: 0;
    background: none;
    font-size: 0.8rem;
  }

  .ProseMirror mark {
    background-color: #FAF594;
  }

  .ProseMirror img {
    max-width: 100%;
    height: auto;
  }

  .ProseMirror hr {
    margin: 1rem 0;
  }

  .ProseMirror blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
  }

  .ProseMirror hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }

  .ProseMirror ul[data-type="taskList"] {
    list-style: none;
    padding: 0;
  }

  .ProseMirror ul[data-type="taskList"] li {
    display: flex;
    align-items: center;
  }
  .ProseMirror ul[data-type="taskList"] li > label {
    flex: 0 0 auto;
    margin-right: 0.5rem;
  }
</style>

<style scoped>
/* menus */
.bubble-menu {
  display: flex;
  background-color: #0D0D0D;
  padding: 0.2rem;
  border-radius: 0.5rem;
}

.bubble-menu button {
  border: none;
  background: none;
  color: #FFF;
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0 0.2rem;
  opacity: 0.6;
}
.bubble-menu:hover,
.bubble-menu.is-active {
  opacity: 1;
}

.floating-menu {
  display: flex;
  background-color: #0D0D0D10;
  padding: 0.2rem;
  border-radius: 0.5rem;
}
.floating-menu button {
  border: none;
  background: none;
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0 0.2rem;
  opacity: 0.6;
}
.floating-menu:hover,
.floating-menu.is-active {
  opacity: 1;
}
</style>

<style scoped>
/* images */
.ProseMirror img {
  max-width: 100%;
  height: auto;
}
.ProseMirror img .ProseMirror-selectednode {
  outline: 3px solid #68CEF8;
}
</style>