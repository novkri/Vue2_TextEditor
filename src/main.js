import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueQuillEditor from 'vue-quill-editor'

Vue.config.productionTip = false


Vue.use(VueQuillEditor)


new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app')
