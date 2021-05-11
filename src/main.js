import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor)


new Vue({
  render: h => h(App),
}).$mount('#app')
