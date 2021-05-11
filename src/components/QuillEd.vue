<template>
<main class="quill-container">
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
      <button id="show-controls" @click="onShowControlsClick" @blur="onShowControlsClick">
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
  <!-- <div class="chips chips-initial" tabindex="0">
    <div class="chip" v-for="chip in chips" :key="chip">
      <span>{{chip}}</span>
      <i class="close fas fa-times" @click="removeChip(chip)"></i>
    </div>
    <input class="input active" placeholder="" v-model="newChipText" @keyup.enter="addNewChip">
  </div> -->
  <Chips :chips="chips" @addNewChip="addNewChip" @removeChip="removeChip" />

  
  <div v-if="saved" class="rendered-output">
    <h2>{{textHeader}}</h2>
    <div v-html="content"></div>
    <div class="chips chips-initial" tabindex="0">
      <div class="chip" v-for="chip in chips" :key="chip">
        {{chip}}
      </div>
    </div>
  </div>
</main>

</template>

<script>
import { Quill } from 'vue-quill-editor'
import ImageResize from 'quill-image-resize-vue';
Quill.register('modules/imageResize', ImageResize);

import Chips from './Chips'

export default {
  components: {
    Chips
  },
  data () {
    return {
      // for render btn
      saved: false,

      // quill editor
      isShowControlsClicked: false,
      textHeader: '',
      content: '',
      editorOption: {
        placeholder: 'I am a placeholder!',
        modules: {
          imageResize: {
            modules: [ 'Resize', 'DisplaySize', ]
          },
          toolbar: []
        }
      },

      // chips
      chips: [
        'Tag 1', 'tag 2', 'Tag 3'
      ],
      // newChipText: ''
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
        // node.setAttribute('alt', value.alt);
        node.setAttribute('src', value.url);
        if (node.width > 750) {
          node.setAttribute('width', '750px');
        }
        node.setAttribute('style', 'display: block; margin: auto;');
        return node;
      }
      
      static value(node) {
        return {
          // alt: node.getAttribute('alt'),
          url: node.getAttribute('src'),
          width: node.getAttribute('width'),
          style: node.getAttribute('style')
        };
      }
    }
    ImageBlot.blotName = 'image';
    ImageBlot.tagName = 'img';

    class VideoBlot extends BlockEmbed {
      // URL HAS TO BE: src="https://www.youtube.com/embed/c2SK1IlmYL8"
      static create(url) {
        let node = super.create();
        node.setAttribute('src', url);
        node.setAttribute('frameborder', '0');
        node.setAttribute('allowfullscreen', true);
        if (node.width > 750) {
          node.setAttribute('width', '750px')
        }
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

    addNewChip(newChip) {
      this.chips.push(newChip)
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

      if (url) {
        this.editor.insertEmbed(range.index, 'video', url, Quill.sources.USER);
        this.editor.formatText(range.index + 1, 1, { height: '170', width: '400' });
        this.editor.setSelection(range.index + 1, Quill.sources.SILENT);
      }
      
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

<style>
/* if <style scoped> - styles are not applied */
main.quill-container {
  max-width: 900px;
  margin: auto;
  font-family: 'Open Sans', Helvetica, sans-serif !important;
}

.render-btn {
  margin-bottom: 30px;
  width: inherit;
}

/* toolbar */
.ql-formats {
  margin-bottom: 10px;
}










/* //////// */
.quill-wrapper {
  border: 1px solid rgba(65, 65, 65, 0.2);
  padding: 30px 45px;
  max-width: 750px;
}

.quill-editor {
  padding: 0;
}

.ql-tooltip.ql-hidden {
  display: none;
}
.ql-container {
  font-size: 1.2rem !important;
  font-family: 'Open Sans', Helvetica, sans-serif !important;
}

#editor-container {
  font-family: 'Open Sans', Helvetica, sans-serif !important;
  font-size: 1.2em !important;
  height: 100%;
}
#editor-container .ql-editor {
  min-height: 100%;
  height: inherit;
  overflow-y: inherit;
  padding-bottom: 75px;
}
/* ???? */
/* #editor-container .ql-editor > * {
  margin-top: 1.5em;
} */
#editor-container .ql-editor > *:last-child {
  margin-bottom: 50px;
}
#editor-container h1 + p,
#editor-container h2 + p {
  margin-top: 0.5em; 
}
#editor-container blockquote {
  border-left: 4px solid #111;
  padding-left: 1em;
}
#editor-container hr {
  border: none;
  color: #111;
  letter-spacing: 1em;
  text-align: center;
}
#editor-container hr:before {
  content: '...';
}

#tooltip-controls {
  background-color: #111;
  border-radius: 4px;
  display: none;
  padding: 5px 10px;
  position: absolute;
}
#tooltip-controls::before {
  box-sizing: border-box;
  border-bottom: 6px solid #111;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  content: ' ';
  display: block;
  height: 6px;
  left: 50%;
  position: absolute;
  margin-left: -6px;
  margin-top: -6px;
  top: 0;
  width: 6px;
}
#tooltip-controls button {
  background-color: transparent;
  color: #fff;
  border: none;
}
#tooltip-controls button.active {
  color: #21b384;
}

#sidebar-controls {
  display: none;
  position: absolute;
}
#sidebar-controls button, .menu button {
  background-color: transparent;
  border: none;
  padding: 0;

  margin: 7px 0px;
}


#sidebar-controls i.fa, .menu i.fa {
  background-color: #fff;
  border: 1px solid rgb(65, 65, 65);
  border-radius: 50%;
  color: rgb(65, 65, 65);
  width: 27px;
  height: 27px;
  line-height: 27px;
}
#sidebar-controls .controls, .menu .controls {
  /* display: none; */
  /* margin-left: 15px; */

  margin-left: 5px;
  border: 1px solid #ededed;
  padding: 5px 8px;
  background-color: #fff;
  box-shadow: 0 5px 10px 0 rgb(0 0 0 / 10%);
}
#sidebar-controls .controls button, .menu .controls button {
  margin: 0;
}

#sidebar-controls .controls button:hover, #sidebar-controls .controls button:hover i.fa {
  background-color: rgb(234 234 234);
}

#sidebar-controls .controls i.fa {
  border: none;
  border-radius: 0;
}
#sidebar-controls.active .controls {
  display: inline-block;
}

button {
  cursor: pointer;
  display: inline-block;
  font-size: 18px;
  padding: 0;
  height: 32px;
  width: 32px;
  text-align: center;
}
button:active, button:focus {
  outline: none;
}

/* bottom-menu */
#bottom-menu {
  padding-top: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
#bottom-menu button {
  background-color: transparent;
  border: none;
  padding: 0;
}
#bottom-menu button:hover {
  background-color: rgb(234 234 234);
}

/* editor-header */
#editor-header textarea {
  padding: 0 15px;
  margin: 0;
  font-size: 32px;
  line-height: 42px;
  resize: none;
  overflow: hidden;
  border: none;
}

#editor-header textarea:focus {
  outline: none;
}
</style>