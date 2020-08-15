/**
 * 同步动作
 * 设置
 */
export default {
	setSite(state, site) {
		state.site = site
		window.sessionStorage.setItem('site', site)
	},
	setUser(state, user) {
		state.user = { ...user }
		window.sessionStorage.setItem('user', JSON.stringify({ ...user }))
	},
}
