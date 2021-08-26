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
import router from './router'

import Vuex from 'vuex'
import axios from "axios";
Vue.use(Vuex)

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.component('chrome', Chrome);

Vue.use(VueQuillEditor, /* { default global options } */)

//test globalisé tout le bordel des éléments
const store = new Vuex.Store({
  state: {
    elements: [
      {
        id: 0,
        grid: [1, 1],
        x: 3.910386965376782,
        y: 1.241914618369987,
        w: 2.0869565217391304,
        h: 13.846153846153847,
        type: "image",
        ratio: false,
        code: '<img style="width:100%;height:100%" src="https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg">',
        toolbarVisibility: "none",
        zindex: 1,
        hover: false,
      },
      {
        id: 1,
        grid: [1, 1],
        x: 3.910386965376782,
        y: 1.241914618369987,
        w: 2.0869565217391304,
        h: 13.846153846153847,
        type: "image",
        ratio: false,
        code: '<img style="width:100%;height:100%" src="https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg">',
        toolbarVisibility: "none",
        zindex: 1,
        hover: false,
      },
      {
        id: 2,
        x: 3.910386965376782,
        y: 1.241914618369987,
        w: 2.0869565217391304,
        h: 13.846153846153847,
        content: "",
        type: "text",
        ratio: false,
        toolbarVisibility: "none",
        color: "hsl(0,61%,48%)",
        zindex: 1,
        hover: false,
      },
      {
        id: 3,
        x: 3.910386965376782,
        y: 1.241914618369987,
        w: 2.0869565217391304,
        h: 13.846153846153847,
        content: "",
        type: "text",
        ratio: false,
        toolbarVisibility: "none",
        zindex: 1,
        hover: false,
      },
      {
        id: 4,
        x: 4,
        y: 4,
        w: 3.8,
        h: 2.15,
        content: "",
        type: "star",
        ratio: true,
        toolbarVisibility: "none",
        color: 'hsl(150,61%,48%)',
        zindex: 1,
        hover: false,
      },

    ],
    texts : []
  },
  mutations: {
    selectElement (state, payload) {
      let idElement = payload.id;
      for (let i = 0; i < state.elements.length; i++) {
        Vue.set(state.elements[i], 'toolbarVisibility', "none")
      }
      Vue.set(state.elements[idElement], 'toolbarVisibility', "block")
    },
    unSelectElement (state, payload) {
      let idElement = payload.id;
      Vue.set(state.elements[idElement], 'toolbarVisibility', "none")

    },

  },
  actions: {
    saveElements: async function () {
      //let textJson = JSON.stringify(this.Texts);
      let ElementJson = JSON.stringify(this.state.elements);
      const jsonPost = {action: 'saveElements', 'jsonE': ElementJson};
      axios.post('http://back.test/back.php', jsonPost)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    loadElements: async  function () {
      const jsonPost = {action: 'loadElements'};
      let fuck = this;
      this.dispatch('emptyArrays');
      axios.post('http://back.test/back.php', jsonPost)
          .then(function (response) {
            console.log(response);
            let res = JSON.parse(response.data.element);
            for (let i in res) {
              fuck.state.elements.push(res[i]);
              //fuck.$set(Texts[res[i].id], 'content', res[i].content)
            }
            res = JSON.parse(response.data.text);
            for (let i in res) {
              fuck.state.texts.push(res[i]);
              //fuck.$set(Texts[res[i].id], 'content', res[i].content)
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    emptyArrays: function () {
      while (this.state.elements.length > 0) {
        this.state.elements.pop();
      }
      while (this.state.texts.length > 0) {
        this.state.texts.pop();
      }
    },
  }
})

new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')
