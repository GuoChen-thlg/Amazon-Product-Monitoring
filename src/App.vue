<template>
	<div id="app">
		<el-container class>
			<el-header type="primary" v-show="!isNoShowTopHeader" class="app-top-bar">
				<TopHeader />
			</el-header>
			<el-main :class="{'app-main':!isNoShowTopHeader}">
				<router-view />
			</el-main>
			<el-backtop target=".app-main"></el-backtop>
		</el-container>
	</div>
</template>
<script>
	import TopHeader from './components/TopHeader'
	import { searchKeyWord } from '@/api'
	import { mapMutations } from 'vuex'
	export default {
		name: 'App',
		data() {
			return {
				isNoShowTopHeader: false,
			}
		},
		mounted() {
			
			// this.requestSidebar()
		},
		components: { TopHeader },
		methods: {
			...mapMutations({ setSidebar: 'category/setSidebar' }),
			/**
			 * 请求侧边栏数据
			 */
			requestSidebar() {
				searchKeyWord({
					'shingles_searchTerm': '925',
					'country_valuesArray': this.$store.state.sites,
				}).then(data => {
					this.setSidebar(data.data.data.categories)
				}).catch((error) => {
					console.log(error);
				})
			}
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
	.app-top-bar {
		width: 100%;
		position: fixed;
		height: 60px;
		background-color: #409eff;
		z-index: 2000;
	}
	.app-main {
		padding-top: 60px;
		padding: {
			left: 0;
			right: 0;
			bottom: 0;
		}
	}
</style>
