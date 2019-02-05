import Vue from 'vue'
import App from './App.vue'
import myVueRouter from 'vue-router'
import List from './List.vue'
import AddData from './AddData.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(myVueRouter);

const routes = [
    { 
        path: '/', 
        name: 'List',
        component: List,
        props: (route) => ({
            ...route.params
        }) 
    },
    {
        path: '/add',
        name: 'AddData',
        component: AddData,
        props: (route) => ({
            ...route.params
        })
    },
]
const router = new myVueRouter ({
  routes : routes,
  mode: 'history' // only uses '/', no '#'
})

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
  })
