import axios from 'axios'
import { Message } from 'element-ui'
const request = axios.create({
	// 统一配置
	baseURL: '', //请求基础地址
	// timeout: 5000, //超时时间
	// headers: {
	// 	// 添加头部信息
	// },
})
// 请求拦截
request.interceptors.request.use(
	function(config) {
		// 判断是否登录
		return config
	},
	function(error) {
		// 请求错误时的处理
		console.log(error)
		return Promise.reject(error)
	}
)
// 响应拦截
request.interceptors.response.use(
	function(response) {
		// 对相应数据的处理
		return response.data
	},
	function(error) {
		// 请求错误时的处理
		switch (status) {
			case 400:
				error.message = '请求错误'
				break
			case 401:
				error.message = '未授权，请登录'
				break
			case 403:
				error.message = '拒绝访问'
				break
			case 404:
				error.message = `请求地址出错: ${error.response.config.url}`
				break
			case 408:
				error.message = '请求超时'
				break
			case 500:
				error.message = '服务器内部错误'
				break
			case 501:
				error.message = '服务未实现'
				break
			case 502:
				error.message = '网关错误'
				break
			case 503:
				error.message = '服务不可用'
				break
			case 504:
				error.message = '网关超时'
				break
			case 505:
				error.message = 'HTTP版本不受支持'
				break
			default:
				break
		}
		// 弹窗提示
		Message.error(`${error.message}`)
		return Promise.reject(error)
	}
)

export default request

// request({
// 	// 可以进行有效覆盖
// 	method: 'POST', //请求方式 默认GET
// 	headers: {
// 		THLGsdf: 'fugai',
// 	},
// 	// url: '',
// 	params: {
// 		ID: 12345,
// 	},
// 	data: {
// 		ID: 45678,
// 	},
// })
// 	.then(data => {
// 		console.log(data)
// 	})
// 	.catch(error => {
// 		console.log(error)
// 	})
