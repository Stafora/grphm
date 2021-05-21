import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'

//autocomplete use https://autocomplete.trevoreyre.com/
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'

//custom select
import vSelect from "vue-select";
Vue.component("v-select", vSelect);
import "vue-select/dist/vue-select.css";

//mask
import InputMask from 'vue-input-mask';
Vue.component('input-mask', InputMask)


import '@/assets/scss/main.scss'
import '@/assets/scss/fonts.scss'
import '@/assets/scss/html.scss'


Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(Autocomplete)

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
