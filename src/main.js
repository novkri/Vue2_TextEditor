import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import VueQuillEditor from 'vue-quill-editor'

// import 'quill/dist/quill.core.css' // import styles
// import 'quill/dist/quill.snow.css' // for snow theme
// import 'quill/dist/quill.bubble.css' // for bubble theme


Vue.use(VueQuillEditor, /* { default global options } */)

import MediumEditor from 'vuejs-medium-editor'
// import MediumEditor from 'vue2-content-editor'

Vue.component('medium-editor', MediumEditor)

import Editor from 'vue-editor-js/src/index'
Vue.use(Editor)

new Vue({
  render: h => h(App),
}).$mount('#app')
