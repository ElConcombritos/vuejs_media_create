import Vue from 'vue'
import App from './App.vue'
import VueDragDropAlign from '@xpf0000/vuedragdropalign'
import '@xpf0000/vuedragdropalign/dist/VueDragDropAlign.css'
import CKEditor from '@ckeditor/ckeditor5-vue2';

Vue.config.productionTip = false
Vue.component('vue-draggable-resizable', VueDragDropAlign)
Vue.use( CKEditor );

import vClickOutside from 'v-click-outside'

Vue.use(vClickOutside)

new Vue({
  render: h => h(App),
}).$mount('#app')
