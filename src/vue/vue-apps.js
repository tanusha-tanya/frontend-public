import Multiselect from 'vue-multiselect'
Vue.component('multiselect', Multiselect)

import Catalog from './catalog.vue'

const catalogBlock = document.querySelector('#catalog');

if (catalogBlock) {
    let app = new Vue({
        el: catalogBlock,
        render: function(h) { return h(Catalog); }
    })
}
