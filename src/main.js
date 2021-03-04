import Vue from 'vue'
import App from './App.vue'
import VueDragDropAlign from '@xpf0000/vuedragdropalign'
import '@xpf0000/vuedragdropalign/dist/VueDragDropAlign.css'

Vue.config.productionTip = false
Vue.component('vue-draggable-resizable', VueDragDropAlign)

import vClickOutside from 'v-click-outside'

Vue.use(vClickOutside)

import VueQuillEditor from 'vue-quill-editor'



import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme


import svg from "./assets/scripts/svg.js";
Vue.use(svg);

import Verte from 'verte';
import 'verte/dist/verte.css';
// register component globally


Vue.component('verte', Verte);
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { Chrome } from 'vue-color'


// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.component('chrome', Chrome);

Vue.use(VueQuillEditor, /* { default global options } */)
new Vue({
  render: h => h(App),
}).$mount('#app')
