const routes = [
	{
		path: '/',
		redirect: { name: 'index' },
	},
	{
		path: '/index',
		name: 'index',
		component: () => import('../views/Index.vue'),
		meta: {
			title: '首页',
			isShowTopHeader: true,
			jurisdiction: {
				login: false,
				member: false,
				visitor: true,
			},
		},
	},
	{
		path: '/category',
		name: 'category',
		component: () => import('@/views/Category.vue'),
		meta: {
			title: '品类',
			isShowTopHeader: true,
			jurisdiction: {
				login: true,
				member: false,
			},
		},
	},
	{
		path: '/product',
		name: 'product',
		component: () => import('@/views/Product.vue'),
		meta: {
			title: '产品',
			isShowTopHeader: true,
			jurisdiction: {
				login: true,
				member: true,
			},
		},
	},
	{
		path: '/keyword',
		name: 'keyword',
		component: () => import('@/views/keyword/Index.vue'),
		redirect: { name: 'excavate' },
		meta: {
			title: '关键词',
			isShowTopHeader: true,
			jurisdiction: {
				login: true, // 一般用户
				member: false, // 优质用户
			},
		},
		children: [
			{
				path: 'excavate',
				name: 'excavate',
				component: () => import('@/views/keyword/Excavate.vue'),
				meta: {
					title: '关键词挖掘',
					isShowTopHeader: true,
					jurisdiction: {
						login: true, // 一般用户
						member: false, // 优质用户
					},
				},
				children: [],
			},
		],
	},
	{
		path: '/comment',
		name: 'comment',
		component: () => import('@/views/Comment.vue'),
		meta: {
			title: '评论',
			isShowTopHeader: true,
			jurisdiction: {
				login: false,
				member: false,
			},
		},
	},
	{
		path: '/my',
		name: 'My',
		component: () => import('@/views/my/Index.vue'),
		redirect: { name: 'trace' },
		meta: {
			title: '个人中心',
			isShowTopHeader: true,
			jurisdiction: {
				login: true, // 一般用户
				member: false, // 优质用户
			},
		},
		children: [
			{
				path: 'trace',
				name: 'trace',
				component: () => import('@/views/my/Trace.vue'),
				meta: {
					title: '产品追踪',
					isShowTopHeader: true,
					jurisdiction: {
						login: true, // 一般用户
						member: false, // 优质用户
					},
				},
				children: [],
			},
		],
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/user/login.vue'),
		meta: {
			title: '登录',
			isShowTopHeader: true,
			jurisdiction: {
				login: false,
				member: false,
			},
		},
	},
	{
		path: '/register',
		name: 'register',
		component: () => import('@/views/user/Register.vue'),
		meta: {
			title: '注册',
			isShowTopHeader: true,
			jurisdiction: {
				login: false,
				member: false,
			},
		},
	},
	{
		path: '/forget',
		name: 'forget',
		component: () => import('@/views/user/Forget.vue'),
		meta: {
			title: '找回密码',
			isShowTopHeader: true,
			jurisdiction: {
				login: false,
				member: false,
			},
		},
	},
	{
		path: '/pag',
		component: () => import('../../test/pag-table.vue'),
		meta: {
			title: '测试table',
			isShowTopHeader: true,
			jurisdiction: {
				login: false,
				member: false,
			},
		},
	},
]
/**
 * 错误页面
 */
const error = [
	{
		path: '/404',
		name: '404',
		component: () => import('@/views/error/404.vue'),
		meta: {
			title: '404',
			jurisdiction: {},
		},
	},
	{
		path: '*',
		redirect: { name: '404' },
	},
]

export default [...routes, ...error]
