<template>
  <div class="hello">
    <button @click="handleSavingContent">save</button>
    <vue-editor v-model="content" :editorOptions="editorSettings" @focus="onEditorFocus"
    @blur="onEditorBlur"
    @selection-change="onSelectionChange"></vue-editor>

    <div v-if="saved" v-html="content">
      {{content}}
    </div>
  </div>
</template>

<script>
import { VueEditor, Quill } from 'vue2-editor'
import ImageResize from 'quill-image-resize-vue'
Quill.register('modules/imageResize', ImageResize)


export default {
  name: 'HelloWorld',
  components: {
    VueEditor
  },

  data() {
    return {
      content: '<h1>Some initial content</h1>',
      // customToolbar: [["bold", "italic", "underline"], [{ list: "ordered" }, { list: "bullet" }], ["image", "code-block"]],
      editorSettings: {
          modules: {
            imageResize: {}
          }
        },
      saved: false
    }
  },

  methods: {
    handleSavingContent() {
      console.log(this.content)
      this.saved = true
    },
    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },

    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },

    onSelectionChange(range) {
      console.log("selection change!", range);
    }
  }
}
</script>

<style scoped>

</style>
