import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
// added for sandbox +vuetify VERSION 2.4.0 - working
// import Vuetify from "vuetify";


// import 'font-awesome/css/font-awesome.min.css'
// import '@fortawesome/fontawesome-free/css/all.css'
import '@mdi/font/css/materialdesignicons.css' 
import ru from 'vuetify/es5/locale/ru'

// added for sandbox
// import "vuetify/dist/vuetify.min.css";

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
