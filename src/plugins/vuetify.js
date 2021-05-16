import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import 'font-awesome/css/font-awesome.min.css'
import '@mdi/font/css/materialdesignicons.css' 
import ru from 'vuetify/es5/locale/ru'

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { ru },
    current: "ru",
  },
  icons: {
    iconfont: 'fa',
  },
  
});
