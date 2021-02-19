import Vue from 'vue'
import App from './App.vue'
import VueDragDropAlign from '@xpf0000/vuedragdropalign'
import '@xpf0000/vuedragdropalign/dist/VueDragDropAlign.css'

Vue.config.productionTip = false
Vue.component('vue-draggable-resizable', VueDragDropAlign)

new Vue({
  render: h => h(App),
}).$mount('#app')
