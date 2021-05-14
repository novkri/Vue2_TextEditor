import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'


Vue.config.productionTip = false

import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor)



import { TiptapVuetifyPlugin } from 'tiptap-vuetify'

Vue.use(TiptapVuetifyPlugin, {
  vuetify,
  iconsGroup: 'fa'
})


new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app')
