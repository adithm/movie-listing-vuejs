import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);
Vue.use(BootstrapVue);

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
  })
