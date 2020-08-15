import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// element-ui
import ElementUI from 'element-ui'
// import './assets/style/element-variables.scss'
import 'element-ui/lib/theme-chalk/index.css'
// 
import '@/assets/style/global.css'
// 国旗样式
import '@/assets/style/national_flag.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
