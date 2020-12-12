/**
 * 过滤器
 * (计算属性)
 */
export default {
	isInlogin: state => state.user.login,//是否登录
	site: state => state.site,//当前站点
	u_name:state=>state.user.name,//用户
}
