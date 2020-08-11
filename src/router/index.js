import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		component: Index,
		meta: {
			isNOShowTopHeader: false,
		},
	},
	{
		path: '/index',
		name: 'Index',
		component: () => import('../views/Index.vue'),
		meta: {},
	},
	{
		path: '/keyword',
		name: 'KeyWord',
		component: () => import('../views/KeyWord.vue'),
		meta: {},
	},
	{
		path: '/login',
		name: 'LogIn',
		component: () => import('../views/user/login.vue'),
		meta: {
			isNOShowTopHeader: true,
		},
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import('../views/user/Register.vue'),
		meta: {
			isNOShowTopHeader: true,
		},
	},
	{
		path: '/4',
		name: 'Home',
		component: () => import('../views/Index.vue'),
		meta: {},
	},
	{
		path: '/*',
		name: '404',
		component: () => import('../views/Index.vue'),
		meta: {},
	},
]

const router = new VueRouter({
	routes,
})

export default router
