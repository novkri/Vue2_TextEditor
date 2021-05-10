<template>
  <div class="wrapper">
    <button @click="onRender">render</button>
    <editor ref="editor" :config="config" :initialized="onInitialized" />

    <div class="ce-example__output">
      <pre class="ce-example__output-content" id="output"></pre>

      <div class="ce-example__output-footer">
        <a href="https://codex.so" style="font-weight: bold;">Made by CodeX</a>
      </div>
    </div>
  </div>
</template>

<script>
import { Editor } from 'vue-editor-js/src/index'
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph'
// import Embed from '@editorjs/embed'
// import Table from '@editorjs/table'
// import Marker from '@editorjs/marker'
// import Warning from '@editorjs/warning'
// import RawTool from '@editorjs/raw'
// import Quote from '@editorjs/quote'
import Delimiter from '@editorjs/delimiter'
import Image from '@editorjs/image'

export default {
  components: {
    Editor
  },
  data() {
    return {
      config: {
        tools:{
          header: {
            class: Header,
            config: {
              placeholder: 'Enter a header',
              levels: [2, 3, 4],
              defaultLevel: 3,
            }
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          paragraph: {
            class: Paragraph,
          },
          // embed: {
          //   class: Embed,
          //   config: {
          //     services: {
          //       youtube: true,
          //       coub: true,
          //       imgur: true
          //     }
          //   }
          // },
          // table: {
          //   class: Table,
          //   inlineToolbar: true,
          //   config: {
          //     rows: 2,
          //     cols: 3,
          //   },
          // },
          // Marker: {
          //   class: Marker,
          //   shortcut: 'CMD+SHIFT+M',
          // },
          // warning: {
          //   class: Warning,
          //   inlineToolbar: true,
          //   shortcut: 'CMD+SHIFT+W',
          //   config: {
          //     titlePlaceholder: 'Title',
          //     messagePlaceholder: 'Message',
          //   },
          // },
          // raw: RawTool,
          // quote: {
          //   class: Quote,
          //   inlineToolbar: true,
          //   shortcut: 'CMD+SHIFT+O',
          //   config: {
          //     quotePlaceholder: 'Enter a quote',
          //     captionPlaceholder: 'Quote\'s author',
          //   },
          // },
          delimiter: Delimiter,
  
           
          image: {
            class: Image,
            config: {
              endpoints: {
                byFile: 'http://localhost:8090/image',
                byUrl: 'http://localhost:8090/image-by-url',
              },
              field: 'image',
              types: 'image/*',
            }
            
          },
            
   
        },
        onReady: () => {
          console.log('on ready')
        },
        onChange: (args) => {
          console.log('Now I know that Editor\'s content changed!', args)
        },
        data: {
            "time": 1591362820044,
            "blocks": [
                {
                    "type" : "header",
                    "data" : {
                        "text" : "Editor.js h",
                        "level" : 2
                    }
                },
                {
                    "type" : "paragraph",
                    "data" : {
                        "text" : "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text."
                    }
                },
                {
                    "type" : "header",
                    "data" : {
                        "text" : "Key features",
                        "level" : 3
                    }
                },
                {
                    "type" : "list",
                    "data" : {
                        "style" : "unordered",
                        "items" : [
                            "It is a block-styled editor",
                            "It returns clean data output in JSON",
                            "Designed to be extendable and pluggable with a simple API"
                        ]
                    }
                },
                
                {
                    "type" : "delimiter",
                    "data" : {}
                },
                {
                    "type" : "paragraph",
                    "data" : {
                        "text" : "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏"
                    }
                },
                {
                    "type" : "image",
                    "data" : {
                        "file" : {
                            "url" : "https://codex.so/public/app/img/external/codex2x.png"
                        },
                        "caption" : "",
                        "withBorder" : false,
                        "stretched" : false,
                        "withBackground" : false
                    }
                },
            ],
            "version" : "2.18.0"
        }
      },
    };
  },
  methods: {
    onInitialized(editor) {
      console.log(editor)
    },
    onRender() {
				this.$refs.editor._data.state.editor.save()
					.then((data) => {
						// Do what you want with the data here
						console.log(data)
            // cPreview.show(data, document.getElementById("output"));
					})
					.catch(err => { console.log(err) })
			}
  }
}
</script>

<style scoped>
.wrapper {
  max-width: 800px;
  border: 1px solid black;
  margin: auto;
}
</style>