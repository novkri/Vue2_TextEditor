import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'


Vue.config.productionTip = false

import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor)


new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app')
