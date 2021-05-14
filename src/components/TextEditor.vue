<template>
  <div>
    <!-- Use the component in the right place of the template -->
    <tiptap-vuetify
      v-model="content"
      :extensions="extensions"
      :toolbar-attributes="{ color: 'black', dark: true }"
      placeholder="Write something …"
    />

    <h3 class="mt-4 primary--text">Preview</h3>
    <v-divider/>
    <div class="tiptap-vuetify-editor__content" v-html="content"/>
    <h3 class="mt-2 primary--text">HTML</h3>
    <v-divider/>
    <div class="mt-3">{{ content }}</div>
  </div>
</template>

<script>

import {  
  // component
  TiptapVuetify,
  // extensions
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  // Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
  Image } from 'tiptap-vuetify'
export default {
  components: { TiptapVuetify },
  data: () => ({
    extensions: [
      History,
      Blockquote,
      Link,
      [Underline,
        {
          renderIn: "bubbleMenu"
        }
      ],
      [Strike,
        {
          renderIn: "bubbleMenu"
        }
      ],
      [
        Italic,
        {
          renderIn: "bubbleMenu"
        }
      ],
      [
        ListItem,
        {
          renderIn: "bubbleMenu"
        }
      ],
      [
        BulletList,
        {
          renderIn: "bubbleMenu"
        }
      ],
      [
        OrderedList,
        {
          renderIn: "bubbleMenu"
        }
      ],
      [Heading, {
        options: {
          levels: [1, 2, 3]
        }
      }],
      Bold,
      // Code,
      HorizontalRule,
      Paragraph,
      HardBreak,
      Image
    ],
    // starting editor's content
    content: `
      <h1>Most basic use</h1>
      <p>
        You can use the necessary extensions. 
        The corresponding buttons are 
        <strong>
          added automatically.
        </strong>
      </p>
    
      <p></p>
      <h2>Icons</h2>
      <p>Avaliable icons groups:</p>
      <ol>
        <li>
          <p>Material Design <em>Official</em></p>
        </li>
        <li>
          <p>Font Awesome (FA)</p>
        </li>
        <li>
          <p>Material Design Icons (MDI)</p>
        </li>
      </ol>
      <p></p>
      <blockquote>
        <p>This package is awesome!</p>
      </blockquote>
      <p></p>
    `
  }),
  

  // mounted() {
  //   const uploadBtn = document.getElementsByClassName("v-tab");
  //   uploadBtn[1].style.display = "none";
  //   uploadBtn[2].style.pointerEvents = "none";
  // }
}
</script>

<style>

</style>