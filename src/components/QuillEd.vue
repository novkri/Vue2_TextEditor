<template>
<div class="wrapper">
  <button class="render-btn" @click="renderContent">Render</button>

  <div class="quill-wrapper">
    <!-- меню по клику на текст -->
    <!-- тултипы при наведении на кнопки -->
    <div id="tooltip-controls">
      <button id="bold-button" @click="onBoldClick"><i class="fa fa-bold"></i></button>
      <button id="italic-button" @click="onItalicClick"><i class="fa fa-italic"></i></button>
      <button id="underline-button" @click="onUnderlineClick"><i class="fa fa-underline"></i></button>

      <!-- some divider here, add classes in css later -->
      <div class="divider-line" style="height: auto; background-color: white; width: 1px; margin: 0 2px;"></div>

      <!-- + цвет текста, цвет фона? цитата, варавнивание, ссылка мб-->
      <button id="link-button" @click="onLinkClick"><i class="fa fa-link"></i></button>
      <button id="blockquote-button" @click="onBlockquoteClick"><i class="fa fa-quote-right"></i></button>
      <button id="header-1-button" @click="onHeaderOneClick"><i class="fa fa-heading"><sub>1</sub></i></button>
      <button id="header-2-button" @click="onHeaderTwoClick"><i class="fa fa-heading"><sub>2</sub></i></button>
    </div>

    <!-- меню при переходе на новую строку -->
    <div id="sidebar-controls" >
      <button id="show-controls" @click="onShowControlsClick">
        <i v-if="!isShowControlsClicked" class="fa fa-plus"></i>
        <i v-else class="fa fa-times"></i>
      </button>
      <span class="controls" v-show="isShowControlsClicked">
        <button @click="onImageBtnClick"><i class="fa fa-camera"></i></button>
        <input type="file" id="image-button" name="filename" @change="uploadImage" style="display:none;">
        <button id="video-button" @click="onVideoClick"><i class="fa fa-play"></i></button>
        <button id="divider-button" @click="onDividerClick"><i class="fa fa-minus"></i></button>
      </span>
    </div>

    <div id="editor-header">
      <textarea placeholder="Название поста" style="height: 42px;" v-model="textHeader"></textarea>
    </div>

    <quill-editor
      id="editor-container"
      ref="myQuillEditor"
      v-model="content"
      :options="editorOption"
    />
    <!--     @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)" -->


    <div id="bottom-menu">
      <span class="controls">
        <button @click="onImageBtnClick"><i class="fa fa-camera"></i></button>
        <input type="file" id="image-button" name="filename" @change="uploadImage" style="display:none;">
        <button id="video-button" @click="onVideoClick"><i class="fa fa-play"></i></button>
        <button id="divider-button" @click="onDividerClick"><i class="fa fa-minus"></i></button>
      </span>
    </div>
  </div>

  <!-- теги make it component -->
  <div class="chips chips-initial" tabindex="0">
    <div class="chip" v-for="chip in chips" :key="chip">
      {{chip}}
      <i class="close fas fa-times" @click="removeChip(chip)"></i>
    </div>
    <input class="input active" placeholder="" v-model="newChipText" @keyup.enter="addNewChip">
  </div>

  
  <div v-if="saved" class="rendered-output">
    <h2>{{textHeader}}</h2>
    <div v-html="content"></div>
    <div class="chips chips-initial" tabindex="0">
      <div class="chip" v-for="chip in chips" :key="chip">
        {{chip}}
      </div>
    </div>
  </div>
</div>

</template>

<script>
import { Quill, quillEditor } from 'vue-quill-editor'
import ImageResize from 'quill-image-resize-vue';
Quill.register('modules/imageResize', ImageResize);

import 'quill/dist/quill.core.css' // import styles
// import 'quill/dist/quill.snow.css' // for snow theme
// import 'quill/dist/quill.bubble.css' // for bubble theme


export default {
  components: {
    quillEditor,
  },
  data () {
    return {
      // for render btn
      saved: false,

      // quill editor
      isShowControlsClicked: false,
      textHeader: '',
      content: '', // content: '<h2>I am Example</h2>',
      editorOption: {
        placeholder: 'I am a placeholder!',
        modules: {
          imageResize: {},
          toolbar: []
        }
      },

      // chips
      chips: [
        'Tag 1', 'tag 2', 'Tag 3'
      ],
      newChipText: ''
    }
  },

  mounted() {
    let Inline = Quill.import('blots/inline');
    let Block = Quill.import('blots/block');
    let BlockEmbed = Quill.import('blots/block/embed');

    class BoldBlot extends Inline { }
    BoldBlot.blotName = 'bold';
    BoldBlot.tagName = 'strong';

    class ItalicBlot extends Inline { }
    ItalicBlot.blotName = 'italic';
    ItalicBlot.tagName = 'em';

    class UnderlineBlot extends Inline { }
    UnderlineBlot.blotName = 'underline';
    UnderlineBlot.tagName = 'U';

    class LinkBlot extends Inline {
      static create(url) {
        let node = super.create();
        node.setAttribute('href', url);
        node.setAttribute('target', '_blank');
        return node;
      }
      
      static formats(node) {
        return node.getAttribute('href');
      }
    }
    LinkBlot.blotName = 'link';
    LinkBlot.tagName = 'a';

    class BlockquoteBlot extends Block { }
    BlockquoteBlot.blotName = 'blockquote';
    BlockquoteBlot.tagName = 'blockquote';

    class HeaderBlot extends Block {
      static formats(node) {
        return HeaderBlot.tagName.indexOf(node.tagName) + 1;
      }
    }
    HeaderBlot.blotName = 'header';
    HeaderBlot.tagName = ['H1', 'H2'];

    class DividerBlot extends BlockEmbed { }
    DividerBlot.blotName = 'divider';
    DividerBlot.tagName = 'hr';

    class ImageBlot extends BlockEmbed {
      static create(value) {
        let node = super.create();
        node.setAttribute('alt', value.alt);
        node.setAttribute('src', value.url);
        return node;
      }
      
      static value(node) {
        return {
          alt: node.getAttribute('alt'),
          url: node.getAttribute('src')
        };
      }
    }
    ImageBlot.blotName = 'image';
    ImageBlot.tagName = 'img';

    class VideoBlot extends BlockEmbed {
      static create(url) {
        let node = super.create();
        node.setAttribute('src', url);
        node.setAttribute('frameborder', '0');
        node.setAttribute('allowfullscreen', true);
        return node;
      }
      
      static formats(node) {
        let format = {};
        if (node.hasAttribute('height')) {
          format.height = node.getAttribute('height');
        }
        if (node.hasAttribute('width')) {
          format.width = node.getAttribute('width');
        }
        return format;
      }
      
      static value(node) {
        return node.getAttribute('src');
      }
      
      format(name, value) {
        if (name === 'height' || name === 'width') {
          if (value) {
            this.domNode.setAttribute(name, value);
          } else {
            this.domNode.removeAttribute(name, value);
          }
        } else {
          super.format(name, value);
        }
      }
    }
    VideoBlot.blotName = 'video';
    VideoBlot.tagName = 'iframe';


    Quill.register(BoldBlot);
    Quill.register(ItalicBlot);
    Quill.register(UnderlineBlot)
    Quill.register(LinkBlot);
    Quill.register(BlockquoteBlot);
    Quill.register(HeaderBlot);
    Quill.register(DividerBlot);
    Quill.register(ImageBlot);
    Quill.register(VideoBlot);


    let quill = this.editor

    let tooltipControls = document.getElementById('tooltip-controls')
    let sidebarControls = document.getElementById('sidebar-controls')
    quill.addContainer(tooltipControls);
    quill.addContainer(sidebarControls);

    let bottomMenu = document.getElementById('bottom-menu')
    quill.addContainer(bottomMenu);

 
    quill.on(Quill.events.EDITOR_CHANGE, function(eventType, range) {
      if (eventType !== Quill.events.SELECTION_CHANGE) return;
      if (range == null) return;

      if (range.length === 0) {
        tooltipControls.style.display = 'none';

        let [block] = quill.scroll.descendant(Block, range.index);

        // if user clicks Enter:
        if (block != null && block.domNode.firstChild instanceof HTMLBRElement) {
          // show sidebar button
          let lineBounds = quill.getBounds(range);

          sidebarControls.classList.remove('active')
          sidebarControls.style.display = 'flex'
          sidebarControls.style.left = lineBounds.left - 50 + 'px'
          sidebarControls.style.top = lineBounds.top - 8 + 'px'
        } else {
          tooltipControls.style.display = 'none';
          sidebarControls.style.display = 'none';
          sidebarControls.classList.remove('active');
        }
      } else {
        tooltipControls.style.display = 'none';
        sidebarControls.style.display = 'none';

        sidebarControls.classList.remove('active');

        // show tooltip
        let rangeBounds = quill.getBounds(range);
        tooltipControls.style.display = 'flex';
        let offWidth = tooltipControls.offsetWidth
        tooltipControls.style.left = rangeBounds.left + (rangeBounds.width/2) - (offWidth/2) + 'px'
        tooltipControls.style.top = rangeBounds.bottom + 10 + 'px'
      }
    });
  },

  methods: {
    renderContent() {
      this.saved = true
      console.log(this.content);
      console.log(this.chips);
    },

    addNewChip() {
      this.chips.push(this.newChipText)
      this.newChipText = ''
    },
    removeChip(clickedChip) {
      this.chips = this.chips.filter(chip => chip.toLowerCase() != clickedChip.toLowerCase())
    },

    // quill editor methods
    onShowControlsClick() {
      this.isShowControlsClicked = !this.isShowControlsClicked
      document.getElementById('show-controls').classList.toggle('active');
      document.getElementById('editor-container').focus()
    },


    // sidebar buttons methods
    onImageBtnClick() {
      // triggers file input click
      document.getElementById('image-button').click()
    },
    uploadImage(e) {
      let img = e.target.files[0]
      let reader = new FileReader()
      reader.readAsDataURL(img);
      let quill = this.editor

      reader.onload = function() {
        let range = quill.getSelection(true);
        quill.insertEmbed(range.index, 'image', {
          url: `${reader.result}`
        }, Quill.sources.USER);
        quill.setSelection(range.index + 1, Quill.sources.SILENT);

        document.getElementById('sidebar-controls').style.display = 'none';
      };

      reader.onerror = function() {
        console.log(reader.error);
      };
    },
    onVideoClick() {
      let range = this.editor.getSelection(true);

      // Link OR local video ???
      // let url = 'https://www.youtube.com/embed/QHH3iSeDBLo?showinfo=0';
      let url = prompt('Enter link URL');


      this.editor.insertEmbed(range.index, 'video', url, Quill.sources.USER);
      this.editor.formatText(range.index + 1, 1, { height: '170', width: '400' });
      this.editor.setSelection(range.index + 1, Quill.sources.SILENT);
      document.getElementById('sidebar-controls').style.display = 'none';
    },
    onDividerClick() {
      let range = this.editor.getSelection(true);
      this.editor.insertEmbed(range.index, 'divider', true, Quill.sources.USER);
      this.editor.setSelection(range.index + 1, Quill.sources.SILENT);
      document.getElementById('sidebar-controls').style.display = 'none';
    },


    // tooltip buttons methods
    onBoldClick() {
      this.editor.format('bold', true);
    },
    onItalicClick() {
      this.editor.format('italic', true);
    },
    onUnderlineClick() {
      this.editor.format('underline', true);
    },

    // TODO: link обработчик ?
    onLinkClick() {
      let value = prompt('Enter link URL');
      this.editor.format('link', value);
    },

    onBlockquoteClick() {
      this.editor.format('blockquote', true);
    },
    onHeaderOneClick() {
      this.editor.format('header', 1);
    },
    onHeaderTwoClick() {
      this.editor.format('header', 2);
    }
  },

  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    },
  },
}

</script>

<style scoped>
.wrapper {
  max-width: 900px;
  margin: auto;
}

.render-btn {
  margin-bottom: 30px;
  width: inherit;
}

/* toolbar */
.ql-formats {
  margin-bottom: 10px;
}


/* chips */
.chips {
  min-height: 45px;
  padding: 1rem 0;
  margin-bottom: 30px;
  border: 0;
  border-bottom: 1px solid #ced4da;
  outline: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
  -webkit-transition: all .3s;
  transition: all .3s;
}

.chip {
  display: inline-block;
  height: 32px;
  padding: 0 12px;
  margin-right: 1rem;
  margin-bottom: 0.5rem;
  /* font-size: 13px; */
  font-weight: 500;
  line-height: 32px;
  color: rgba(0,0,0,0.6);
  cursor: pointer;
  background-color: #eceff1;
  border-radius: 16px;
  -webkit-transition: all .3s linear;
  transition: all .3s linear;
}

.chip img {
  float: left;
  width: 32px;
  height: 32px;
  margin: 0 8px 0 -12px;
  border-radius: 50%;
}

.chip .close {
  float: right;
  padding-left: 8px;
  font-size: 16px;
  line-height: 32px;
  cursor: pointer;
  -webkit-transition: all .1s linear;
  transition: all .1s linear;
}

.chip .close:hover {
  /* background-color: #fff; */
  color: #000;
}
.chips .input {
  display: inline-block;
  width: 120px !important;
  height: 32px;
  padding: 0 !important;
  margin-right: 20px;
  /* font-size: 13px; */
  font-weight: 500;
  line-height: 32px;
  color: rgba(0,0,0,0.6);
  background: 0;
  border: 0;
  outline: 0;
  overflow: visible;
}

.chips .input:focus {
  border: 0 !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}
</style>