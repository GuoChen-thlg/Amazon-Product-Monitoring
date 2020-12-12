import { request as axios } from '../util/request'
/**
 * @description flag 为选填项，该标识为请求接口的唯一标志，防止重复请求
 *
 * @param {String} flag 该请求API的方法名(推荐)
 *
 */
/**
 * 测试方法
 *
 * @export {Function} text
 * @param {JSON} data
 * @returns {Function} axios
 */
export function text(data) {
	// console.log(data)
	return axios({
		flag: 'text',
		url: 'https://easydoc.xyz/mock/NX1XF1Cx/p/29538143/PW4fVBR1',
		method: 'GET',
		data,
	})
}
/**
 * 登录方法
 *
 * @export
 * @param {JSON} data
 * @returns
 */
export function login(data) {
	return axios({
		flag: 'login',
		url: '/custom/user/loginCus',
		method: 'POST',
		data,
	})
}
/**
 * 注册方法
 *
 * @export
 * @param {JSON} data
 * @returns
 */
export function register(data) {
	return axios({
		flag: 'register',
		url: '/custom/user/registerCus',
		method: 'POST',
		data,
	})
}
/**
 * 关键词搜索
 *
 * @export
 * @param {JSON} data
 * @returns
 */
export function searchKeyWord(data) {
	let params = `data%5Bshingles%5D%5Btype%5D=shingles&data%5Bshingles%5D%5Bcolumn%5D=name&data%5Bshingles%5D%5BsearchTerm%5D=${data['shingles_searchTerm']}&data%5Bcategory%5D%5Btype%5D=terms&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Appliances&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Arts%2C%20Crafts%20%26%20Sewing&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Automotive&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Baby&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Beauty%20%26%20Personal%20Care&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Books&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=CDs%20%26%20Vinyl&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Camera%20%26%20Photo&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Cell%20Phones%20%26%20Accessories&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Clothing%2C%20Shoes%20%26%20Jewelry&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Computers%20%26%20Accessories&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Electronics&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Grocery%20%26%20Gourmet%20Food&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Health%20%26%20Household&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Home%20%26%20Kitchen&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Industrial%20%26%20Scientific&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Kindle%20Store&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Kitchen%20%26%20Dining&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Movies%20%26%20TV&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Music&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Musical%20Instruments&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Office%20Products&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Patio%2C%20Lawn%20%26%20Garden&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Pet%20Supplies&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Software&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Sports%20%26%20Outdoors&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Tools%20%26%20Home%20Improvement&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Toys%20%26%20Games&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Video%20Games&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Watches&data%5Bcountry%5D%5Btype%5D=terms&data%5Bcountry%5D%5BvaluesArray%5D%5B%5D=${data.country_valuesArray}&data%5BwordCount%5D%5Btype%5D=range&data%5BwordCount%5D%5Bmin%5D=0&data%5BwordCount%5D%5Bmax%5D=999&data%5BisComplete%5D%5Btype%5D=terms&data%5BisComplete%5D%5BvaluesArray%5D%5B%5D=true&data%5Bstate%5D%5Btype%5D=terms&data%5Bstate%5D%5BvaluesArray%5D%5B%5D=active&data%5BestimatedExactSearchVolume%5D%5Btype%5D=range&data%5BestimatedExactSearchVolume%5D%5Bmin%5D=1&data%5BestimatedExactSearchVolume%5D%5Bmax%5D=9999999&data%5BestimatedBroadSearchVolume%5D%5Btype%5D=range&data%5BestimatedBroadSearchVolume%5D%5Bmin%5D=1&data%5BestimatedBroadSearchVolume%5D%5Bmax%5D=9999999&data%5BorganicProductCount%5D%5Btype%5D=range&data%5BorganicProductCount%5D%5Bmin%5D=1&data%5BorganicProductCount%5D%5Bmax%5D=9999999&data%5Bsort%5D%5Btype%5D=sort&data%5Bsort%5D%5Bcolumn%5D=estimatedExactSearchVolume&data%5Bsort%5D%5Bdirection%5D=desc&data%5Bpaginate%5D%5Btype%5D=paginate&data%5Bpaginate%5D%5BpageSize%5D=4500&skipCounter=false&excludeTopBrands=false`
	return axios({
		flag: 'searchKeyWord',
		url: `https://api.junglescout.com/api/keyword_engine/get_related_keywords?${params}`,
		method: 'GET',
		headers: {
			authorization:
				'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTc2MzIyMzgsImlhdCI6MTU5NzAyNzQzOCwiaXNzIjoianVuZ2xlc2NvdXRfYXBpIiwiYXVkIjoiY2xpZW50IiwiYXV0aF90b2tlbiI6ImUxZDJiODU5YzlkNGM0ZTMxMjJhNzEyMDE3ZDI4ZDQxIn0.qe1EwzDLh39gGN3btAQWl-RtWj6p8DSwszwX4xyzZPI',
		},
	})
}
/**
 * @description 关键词模糊匹配
 *  fetch 请求方法
 * @param {JSON} data
 */
export function fuzzyMatching(data) {
	let param = `station=${data.station}&keyword=${data.keyword}`
	document.cookie = 'current_guest=XMQWqvCT10vV_200725-146372;path=/;'
	document.cookie = 'rank_c_s_ind = 2;path=/;'
	document.cookie = 'ecookie=G4szO29IVP47HphA_CN;path=/;'
	document.cookie = '_ga=GA1.2.153005768.1595658825;path=/;'
	document.cookie = '_gid=GA1.2.255087801.1597891484;path=/;'
	document.cookie = 'ecookie=G4szO29IVP47HphA_CN;path=/;'
	document.cookie =
		'rank-login-user=3593297951IrZXNTSoIlHhPKyHGfg/7TMbw6xY7YpCjminsqgfQO1BZZabbPcssETMMk4SBIue;path=/;'
	document.cookie =
		'ao_lo_to_n=3593297951IrZXNTSoIlHhPKyHGfg/7ezIvLAYTuzmrBnyXMtu1/D2twLJ+X6Bu92AUbYIJnTKchF69MyKgoVvVQlAr9zwv1s8VxrTVcjCz/HinK/ubiM=;path=/;'
	document.cookie =
		'crisp-client%2Fsession%2F02ce6ae3-e1ab-4bb7-ae11-b1a839c52e78=session_9f0dc2d7-588b-4d4d-b328-d6bbc709c39c;path=/;'
	document.cookie =
		'JSESSIONID=502A1733B0E347B892F3543118DEBEAA;_gat_gtag_UA_135032196_1 = 1;path=/;'
	// return axios({
	// 	url: `/api/v2/suggestions/?${param}`,
	// 	method: 'GET',
	// 	withCredentials: true,
	// })

	return fetch(`/api/v2/suggestions/?${param}`).then(function(response) {
		return response.json()
	})
}
/**
 * @description 得到用户追踪产品 axin 列表
 * 
 * @param {json} params 用户名字
 * @returns 
 */
export function traceList(params) {
	return axios({
		flag: 'traceList',
		url: '/custom/user/looktrack',
		method: 'POST',
		params
	 })
}
 /**
  * @description 根据 asin 获取产品信息
  * 
  * @param {string} params 
  * @returns 
  */
export function getProducrs(params) {
	return axios({
		flag: 'traceList',
		url: `/custom/user/amzproductList/${params}`,
		method: 'GET'
	 })
}

export function cancelTrace() {
	return axios({
		flag: 'cancelTrace',
		url: `/custom/user/amzproductList/${params}`,
		method: 'GET'
	 })
}