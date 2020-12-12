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
		sites: [
			// 站点列表
			{
				country: '澳大利亚',
				mark: 'au',
				disabled: true,
			},
			{
				country: '巴西',
				mark: 'br',
				disabled: true,
			},
			{
				country: '加拿大',
				mark: 'ca',
				disabled: true,
			},
			{
				country: '中国',
				mark: 'cn',
				disabled: true,
			},
			{
				country: '法国',
				mark: 'fr',
				disabled: true,
			},
			{
				country: '德国',
				mark: 'de',
				disabled: true,
			},
			{
				country: '印度',
				mark: 'in',
				disabled: true,
			},
			{
				country: '意大利',
				mark: 'it',
				disabled: true,
			},
			{
				country: '日本',
				mark: 'jp',
				disabled: true,
			},
			{
				country: '墨西哥',
				mark: 'mx',
				disabled: true,
			},
			{
				country: '荷兰',
				mark: 'nl',
				disabled: true,
			},
			{
				country: '沙特',
				mark: 'sa',
				disabled: true,
			},
			{
				country: '新加坡',
				mark: 'sg',
				disabled: true,
			},
			{
				country: '西班牙',
				mark: 'es',
				disabled: true,
			},
			{
				country: '土耳其',
				mark: 'tr',
				disabled: true,
			},
			{
				country: '阿拉伯',
				mark: 'ae',
				disabled: true,
			},
			{
				country: '英国',
				mark: 'gb',
				disabled: true,
			},
			{
				country: '美国',
				mark: 'us',
				disabled: false,
			},
		],
		user: JSON.parse(window.sessionStorage.getItem('user')) || {
			member: true,
			login: true,
			name: 'text',
			token: '',
		},
	},
	getters,
	mutations,
	actions,
	modules,
})
