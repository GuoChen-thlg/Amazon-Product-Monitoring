module.exports = {
    devServer: {
		port: 8081,
		proxy: {
			'/api': {
				target: 'https://www.sellersprite.com',
				changOrigin: true,
				pathRewrite: {
					'^/api': '',
				},
			},
		},
		disableHostCheck: true,
	},
    lintOnSave: false
}
