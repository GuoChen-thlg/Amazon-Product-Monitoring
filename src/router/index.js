import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { Message } from 'element-ui'
import { clearPending } from '../util/request'

Vue.use(VueRouter)

const router = new VueRouter({
	routes,
	scrollBehavior() {
		return { x: 0, y: 0 }
	},
})
/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach((to, from, next) => {
	/* 路由跳转，清空所有正在发起的请求 */
	clearPending()
	// 获取用户状态
	let user = router.app.$options.store.state.user
	if (to.meta.jurisdiction.login ? (user.login ? false : true) : false) {
		Message({
			message: '请登录',
			type: 'warning',
			duration: 1500,
		})
		next({ name: 'login' })
	} else {
		if (to.meta.jurisdiction.member ? (user.member ? false : true) : false) {
			Message({
				message: '请充值60万成为会员',
				type: 'warning',
				duration: 1500,
			})
			// 去充值会员
			next()
		} else {
			/* 必须调用 `next` */
			next()
		}
	}
})

// router.beforeResolve((to, from, next) => {
// 	/* 必须调用 `next` */
// 	console.log(to)
// 	next()
// })

export default router
