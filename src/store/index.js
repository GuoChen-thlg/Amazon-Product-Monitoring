import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import mutations from './mutations'
import actions from './actions'
import modules from './modules'
import getters from './getters'

export default new Vuex.Store({
	state: {
		site: window.sessionStorage.getItem('site') || 'us', // 站点
		sites: [// 站点列表
			{
				country: '澳大利亚',
				mark: 'au',
			},
			{
				country: '巴西',
				mark: 'br',
			},
			{
				country: '加拿大',
				mark: 'ca',
			},
			{
				country: '中国',
				mark: 'cn',
			},
			{
				country: '法国',
				mark: 'fr',
			},
			{
				country: '德国',
				mark: 'de',
			},
			{
				country: '印度',
				mark: 'in',
			},
			{
				country: '意大利',
				mark: 'it',
			},
			{
				country: '日本',
				mark: 'jp',
			},
			{
				country: '墨西哥',
				mark: 'mx',
			},
			{
				country: '荷兰',
				mark: 'nl',
			},
			{
				country: '沙特',
				mark: 'sa',
			},
			{
				country: '新加坡',
				mark: 'sg',
			},
			{
				country: '西班牙',
				mark: 'es',
			},
			{
				country: '土耳其',
				mark: 'tr',
			},
			{
				country: '阿拉伯',
				mark: 'ae',
			},
			{
				country: '英国',
				mark: 'gb',
			},
			{
				country: '美国',
				mark: 'us',
			},
		],
		user: JSON.parse(window.sessionStorage.getItem('user')) || {
			member: false,
			login: false,
			// visitor: true,
			name: '',
			token:'',
		},
	},
	getters,
	mutations,
	actions,
	modules,
})
