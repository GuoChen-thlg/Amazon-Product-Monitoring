<template>
	<div id="app">
		<el-container class>
			<el-header type="primary" v-show="!isNoShowTopHeader" class="app-top-bar">
				<top-header />
			</el-header>
			<el-main :class="{'app-main':!isNoShowTopHeader}">
				<router-view />
			</el-main>
			<el-backtop class=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
			<el-footer>
				<div class="">
				</div>
				<p class="info">&copy;{{new Date().getFullYear()}} 雅菲尼</p>
			</el-footer>
		</el-container>
	</div>
</template>
<script>
	import TopHeader from './components/TopHeader'
	import { searchKeyWord } from '@/api'
	// import { mapMutations } from 'vuex'
	export default {
		name: 'app',
		data() {
			return {
				isNoShowTopHeader: false,
			}
		},
		mounted() {

			// this.requestSidebar()
		},
		components: {
			'top-header': TopHeader
		},
		methods: {
			// ...mapMutations({ setSidebar: 'category/setSidebar' }),
			/**
			 * 请求侧边栏数据
			 */
			// requestSidebar() {
			// 	searchKeyWord({
			// 		'shingles_searchTerm': '925',
			// 		'country_valuesArray': this.$store.state.sites,
			// 	}).then(data => {
			// 		this.setSidebar(data.data.data.categories)
			// 	}).catch((error) => {
			// 		console.log(error);
			// 	})
			// }
		},
		watch: {
			'$route': function (to) {
				document.title = to.meta.title ? `${process.env.VUE_APP_TITLE} | ${to.meta.title}` : process.env.VUE_APP_TITLE
				this.isNoShowTopHeader = !to.meta.isShowTopHeader
			}
		},

	}
</script>


<style scoped lang='scss'>
	#app {
		section {
			.app-top-bar {
				width: 100%;
				position: fixed;
				height: 60px;
				background-color: #409eff;
				z-index: 2000;
			}
			main {
				min-height: calc(100vh - 60px);
			}
			.app-main {
				padding: {
					top: 60px;
					left: 0;
					right: 0;
					bottom: 0;
				}
			}
			footer {
				font-size: 14px;

				.info {
					text-align: center;
				}
			}
		}
	}
</style>
