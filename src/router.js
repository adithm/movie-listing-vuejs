import Vue from 'vue'
import myVueRouter from 'vue-router'
import ListView from './views/ListView.vue'
import AddData from './views/AddMovie.vue'

Vue.use(myVueRouter);

const routes = [
    { 
        path: '/', 
        name: 'ListView',
        component: ListView,
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

export default new myVueRouter ({
  routes : routes,
  mode: 'history' // only uses '/', no '#'
})