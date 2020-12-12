const category = {
	namespaced: true,
	state: {
		sidebarList: [
			{
				label: 'Appliances',
				value: 'Appliances',
				name: 'Appliances',
			},
			{
				label: 'Arts, Crafts  Sewing',
				value: 'Arts, Crafts  Sewing',
				name: 'Arts, Crafts  Sewing',
			},
			{
				label: 'Automotive',
				value: 'Automotive',
				name: 'Automotive',
			},
			{
				label: 'Baby',
				value: 'Baby',
				name: 'Baby',
			},
			{
				label: 'Beauty  Personal Care',
				value: 'Beauty  Personal Care',
				name: 'Beauty  Personal Care',
			},
			{
				label: 'Books',
				value: 'Books',
				name: 'Books',
			},
			{
				label: 'CDs  Vinyl',
				value: 'CDs  Vinyl',
				name: 'CDs  Vinyl',
			},
			{
				label: 'Camera  Photo',
				value: 'Camera  Photo',
				name: 'Camera  Photo',
			},
			{
				label: 'Cell Phones  Accessories',
				value: 'Cell Phones  Accessories',
				name: 'Cell Phones  Accessories',
			},
			{
				label: 'Clothing, Shoes  Jewelry',
				value: 'Clothing, Shoes  Jewelry',
				name: 'Clothing, Shoes  Jewelry',
			},
			{
				label: 'Computers  Accessories',
				value: 'Computers  Accessories',
				name: 'Computers  Accessories',
			},
			{
				label: 'Electronics',
				value: 'Electronics',
				name: 'Electronics',
			},
			{
				label: 'Grocery  Gourmet Food',
				value: 'Grocery  Gourmet Food',
				name: 'Grocery  Gourmet Food',
			},
			{
				label: 'Health  Household',
				value: 'Health  Household',
				name: 'Health  Household',
			},
			{
				label: 'Home  Kitchen',
				value: 'Home  Kitchen',
				name: 'Home  Kitchen',
			},
			{
				label: 'Industrial  Scientific',
				value: 'Industrial  Scientific',
				name: 'Industrial  Scientific',
			},
			{
				label: 'Kindle Store',
				value: 'Kindle Store',
				name: 'Kindle Store',
			},
			{
				label: 'Kitchen  Dining',
				value: 'Kitchen  Dining',
				name: 'Kitchen  Dining',
			},
			{
				label: 'Movies  TV',
				value: 'Movies  TV',
				name: 'Movies  TV',
			},
			{
				label: 'Music',
				value: 'Music',
				name: 'Music',
			},
			{
				label: 'Musical Instruments',
				value: 'Musical Instruments',
				name: 'Musical Instruments',
			},
			{
				label: 'Office Products',
				value: 'Office Products',
				name: 'Office Products',
			},
			{
				label: 'Patio, Lawn  Garden',
				value: 'Patio, Lawn  Garden',
				name: 'Patio, Lawn  Garden',
			},
			{
				label: 'Pet Supplies',
				value: 'Pet Supplies',
				name: 'Pet Supplies',
			},
			{
				label: 'Software',
				value: 'Software',
				name: 'Software',
			},
			{
				label: 'Sports  Outdoors',
				value: 'Sports  Outdoors',
				name: 'Sports  Outdoors',
			},
			{
				label: 'Tools  Home Improvement',
				value: 'Tools  Home Improvement',
				name: 'Tools  Home Improvement',
			},
			{
				label: 'Toys  Games',
				value: 'Toys  Games',
				name: 'Toys  Games',
			},
			{
				label: 'Video Games',
				value: 'Video Games',
				name: 'Video Games',
			},
			{
				label: 'Watches',
				value: 'Watches',
				name: 'Watches',
			},
		],
	},
	getters: {
		sidebarList: state => {
			return state.sidebarList
		},
	},
	mutations: {
		setSidebar: function(state, sidebarData) {
			state.sidebarList = sidebarData
		},
	},
}
export default category
