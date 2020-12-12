import axios from 'axios'
import { Message } from 'element-ui'
// axios
const request = axios.create({
	// 统一配置
	baseURL: process.env.VUE_APP_BASE_URL, //请求基础地址
	timeout: 5000, //超时时间
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
	},
})
// axios.defaults.crossDomain = true
// axios.defaults.withCredentials = true
const pending = new Map() // 待请求体
/**
 * @description 添加请求
 *
 * @param {Object} config
 */
function addPending(config) {
	// 唯一标识
	let flag = config.flag || false
	if (flag) {
		config.cancelToken = new axios.CancelToken(cancel => {
			if (!pending.has(flag)) {
				pending.set(flag, cancel)
			} else {
				const oldCancel = pending.get(flag)
				oldCancel()
				pending.set(flag, cancel)
			}
		})
	}
	return config
}
/**
 * @description 移除请求
 *
 * @param {Object} config
 */
function removePending(config) {
	let flag = config.flag || false
	if (flag && pending.has(flag)) {
		pending.delete(flag)
	}
}
/**
 * @description 清空所有请求
 *
 */
function clearPending() {
	for (const [flag, oldCancel] of pending) {
		oldCancel()
	}
	pending.clear()
}
// 请求拦截
request.interceptors.request.use(
	function(config) {
		return addPending(config)
	},
	function(error) {
		// 请求错误时的处理
		return Promise.reject(error)
	}
)
// 响应拦截
request.interceptors.response.use(
	function(response) {
		// 请求成功，移除
		removePending(response.config)
		// 对相应数据的处理
		// ...
		return response.data
	},
	function(error) {
		// 请求错误时的处理
		if (axios.isCancel(error)) {
			// 取消请求的错误，将无任何返回
			return
		}
		if (error && error.response && error.response.status) {
			switch (error.response.status) {
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
		}
		if (error.message.includes('timeout')) {
			Message({
				message: '请求超时，请稍后再试',
				type: 'error',
			})
			return Promise.reject(error)
		}
		Message({
			message: error.message,
			type: 'error',
		})
		return Promise.reject(error)
	}
)

export { request, clearPending }

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
