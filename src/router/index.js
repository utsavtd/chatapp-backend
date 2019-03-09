import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/components/homePage.vue'
import chat from '@/components/chat.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'homePage',
			component: homePage
		},

		{
			path: '/chat',
			name: 'chat',
			component: chat
		},

	]

})
