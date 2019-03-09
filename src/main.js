import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import VueSocketio from 'vue-socket.io';
Vue.use(VueSocketio, 'http://localhost:3000/');
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
	el: '#app',
	router,
	render: h => h(App)
}).$mount('#app')

// var app = new Vue({
// 	el: '#app',
// 	router,
// 	components: { App },
// 	template: '<App/>'
// })
