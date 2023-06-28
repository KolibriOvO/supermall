import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";
import Toast from "@/components/common/toast";

Vue.config.productionTip = false
Vue.use(Toast)
FastClick.attach(document.body)
Vue.use(VueLazyload,{
  loading:require('@/assets/img/common/placeholder.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
