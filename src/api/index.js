import axios from '../util/request'
/**
 * 测试方法
 *
 * @export
 * @param {JSON} data
 * @returns
 */
export function text(data) {
	console.log(data)
	return axios({
		url: 'https://easydoc.xyz/mock/NX1XF1Cx/p/29538143/0I92pgNB',
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
export function Login(data) {
	return axios({
		url: '',
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
export function Register(data) {
	return axios({
		url: '',
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
	console.log(data)
	let params = `data%5Bshingles%5D%5Btype%5D=shingles
	&data%5Bshingles%5D%5Bcolumn%5D=name
	&data%5Bshingles%5D%5BsearchTerm%5D=${data['shingles_searchTerm']}
	&data%5Bcategory%5D%5Btype%5D=terms
	&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Appliances
	&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Arts%2C%20Crafts%20%26%20Sewing
	&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Automotive
	&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Baby
	&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Beauty%20%26%20Personal%20Care
	&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Books
	&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=CDs%20%26%20Vinyl
	&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Camera%20%26%20Photo
	&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Cell%20Phones%20%26%20Accessories
	&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Clothing%2C%20Shoes%20%26%20Jewelry
	&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Computers%20%26%20Accessories
	&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Electronics
	&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Grocery%20%26%20Gourmet%20Food
	&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Health%20%26%20Household
	&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Home%20%26%20Kitchen
	&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Industrial%20%26%20Scientific
	&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Kindle%20Store
	&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Kitchen%20%26%20Dining
	&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Movies%20%26%20TV
	&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Music
	&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Musical%20Instruments
	&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Office%20Products
	&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Patio%2C%20Lawn%20%26%20Garden
	&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Pet%20Supplies
	&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Software
	&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Sports%20%26%20Outdoors
	&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Tools%20%26%20Home%20Improvement
	&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Toys%20%26%20Games
	&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Video%20Games
	&data%5Bcategory%5D%5BvaluesArray%5D%5B%5D=Watches
	&data%5Bcountry%5D%5Btype%5D=terms
	&data%5Bcountry%5D%5BvaluesArray%5D%5B%5D=${data['country_valuesArray']}
	&data%5BwordCount%5D%5Btype%5D=range
	&data%5BwordCount%5D%5Bmin%5D=0
	&data%5BwordCount%5D%5Bmax%5D=999
	&data%5BisComplete%5D%5Btype%5D=terms
	&data%5BisComplete%5D%5BvaluesArray%5D%5B%5D=true
	&data%5Bstate%5D%5Btype%5D=terms
	&data%5Bstate%5D%5BvaluesArray%5D%5B%5D=active
	&data%5BestimatedExactSearchVolume%5D%5Btype%5D=range
	&data%5BestimatedExactSearchVolume%5D%5Bmin%5D=1
	&data%5BestimatedExactSearchVolume%5D%5Bmax%5D=9999999
	&data%5BestimatedBroadSearchVolume%5D%5Btype%5D=range
	&data%5BestimatedBroadSearchVolume%5D%5Bmin%5D=1
	&data%5BestimatedBroadSearchVolume%5D%5Bmax%5D=9999999
	&data%5BorganicProductCount%5D%5Btype%5D=range
	&data%5BorganicProductCount%5D%5Bmin%5D=1
	&data%5BorganicProductCount%5D%5Bmax%5D=9999999
	&data%5Bsort%5D%5Btype%5D=sort
	&data%5Bsort%5D%5Bcolumn%5D=estimatedExactSearchVolume
	&data%5Bsort%5D%5Bdirection%5D=desc
	&data%5Bpaginate%5D%5Btype%5D=paginate
	&data%5Bpaginate%5D%5BpageSize%5D=250
	&skipCounter=false
	&excludeTopBrands=false`
	return axios({
		url: `https://api.junglescout.com/api/keyword_engine/get_related_keywords?${params}`,
		method: 'GET',
		headers: {
			authorization:
				'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTc2MzIyMzgsImlhdCI6MTU5NzAyNzQzOCwiaXNzIjoianVuZ2xlc2NvdXRfYXBpIiwiYXVkIjoiY2xpZW50IiwiYXV0aF90b2tlbiI6ImUxZDJiODU5YzlkNGM0ZTMxMjJhNzEyMDE3ZDI4ZDQxIn0.qe1EwzDLh39gGN3btAQWl-RtWj6p8DSwszwX4xyzZPI',
		},
	})
}
