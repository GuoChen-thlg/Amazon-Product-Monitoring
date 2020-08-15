import axios from 'axios'
import { Message } from 'element-ui'
// axios
const request = axios.create({
	// 统一配置
	baseURL: process.env.API_BASE_URL, //请求基础地址
	timeout: 5000, //超时时间
})

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
		console.log(error)
		return Promise.reject(error)
	}
)
// 响应拦截
request.interceptors.response.use(
	function(response) {
		// 请求成功，移除
		removePending(response.config)
		// 对相应数据的处理
		return response.data
	},
	function(error) {
		// 请求错误时的处理
		// 弹窗提示
		if (axios.isCancel(error)) {
			// 取消请求的错误，将无任何返回
			return
		}
		if (error.message.includes('timeout')) {
			Message({
				message: '请求超时，请稍后再试',
				type: 'error',
			})
			return Promise.reject(error)
		}
		Message({
			message: '网络连接失败，请稍后再试',
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
