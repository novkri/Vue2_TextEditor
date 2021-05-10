<template>
  <div id="app">
    <!-- vue2-editor + quill based -->
    <!-- <HelloWorld /> -->

    <!-- tiptap -->
    <!-- <VueEditorrTipTap /> -->

    <!-- medium - Need running server! -->
    <!-- <Medium /> -->

    <!-- another quill based -->
    <QuillEd />

    <!-- Editor.js based - Need running server! -->
    <!-- <Editor /> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import VueEditorrTipTap from './components/VueEditorr'
// import Medium from './components/Medium'
import QuillEd from './components/QuillEd'
// import Editor from './components/Editor'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    // VueEditorrTipTap
    // Medium
    QuillEd
    // Editor
  }
}
</script>

<style>
.quill-wrapper {
  border: 1px solid rgba(65, 65, 65, 0.2);
  padding: 30px 45px;
}

/* some quill.css file overwrites styles for editor in component */
.quill-editor {
  /* border: 1px solid rgba(65, 65, 65, 0.2); */
  /* padding: 30px 45px; */
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
  /* margin: 0 auto; */
  width: 750px;
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
