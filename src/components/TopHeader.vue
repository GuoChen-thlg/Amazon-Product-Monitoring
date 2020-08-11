<template>
	<div class="topheader-outer">
		<div class="logo">
			<router-link tag="div" to="/index">LOGO</router-link>
		</div>
		<div class="main">
			<div class="site-selector">
				<el-select @change="selectSite" v-model="site.val" filterable placeholder="请选择">
					<el-option
						v-for="item in site.options"
						:key="item.value"
						:label="item.country"
						:value="item.mark"
					></el-option>
				</el-select>
			</div>
			<div class="menu">
				<Navbar />
			</div>
		</div>

		<div class="user-box">
			<template v-if="true">
				<el-avatar icon="el-icon-user-solid"></el-avatar>
			</template>
			<el-dropdown @command="handle">
				<span class="el-dropdown-link">
					<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="QUIT">退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>


<script>
	import Navbar from './NavBar'
	export default {
		name: 'TopHeader',
		data() {
			return {
				site: {
					val: this.$store.state.site,
					options: [
						{
							country: '澳大利亚',
							mark: 'au',
						},
						{
							country: '巴西',
							mark: 'br',
						},
						{
							country: '加拿大',
							mark: 'ca',
						},
						{
							country: '中国',
							mark: 'cn',
						},
						{
							country: '法国',
							mark: 'fr',
						},
						{
							country: '德国',
							mark: 'de',
						},
						{
							country: '印度',
							mark: 'in',
						},
						{
							country: '意大利',
							mark: 'it',
						},
						{
							country: '日本',
							mark: 'jp',
						},
						{
							country: '墨西哥',
							mark: 'mx',
						},
						{
							country: '荷兰',
							mark: 'nl',
						},
						{
							country: '沙特',
							mark: 'sa',
						},
						{
							country: '新加坡',
							mark: 'sg',
						},
						{
							country: '西班牙',
							mark: 'es',
						},
						{
							country: '土耳其',
							mark: 'tr',
						},
						{
							country: '阿拉伯',
							mark: 'ae',
						},
						{
							country: '英国',
							mark: 'gb',
						},
						{
							country: '美国',
							mark: 'us',
						},
					],
				}
			}
		},

		mounted() {

		},
		methods: {
			/**
			 * 选择站点
			 * 设置站点值
			 */
			selectSite(value) {
				this.$store.commit('setSite', value)
			},
			/**
			 * 用户下拉菜单
			 */
			handle(command) {
				switch (command) {
					case 'QUIT':
						console.log('退出');
						this.$router.push({ path: '/login' })
						break;
				}
			}
		},
		watch: {
			/**
			 * 监视站点变化
			 */
			'stateSite': function () {
				this.site.val = this.$store.state.site
			}
		},
		computed: {
			/**
			 * 站点
			 * 计算
			 */
			stateSite: function () {
				return this.$store.state.site
			}
		},
		components: {
			Navbar
		}
	}
</script>

<style lang="scss" scoped>
	.topheader-outer {
		width: 100%;
		position: fixed;
		height: 60px;
		background-color: #409eff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 999;

		.logo {
			width: 200px;
			text-align: center;
			cursor: pointer;
		}
		.main {
			width: 1270px;
			display: flex;
		}
		.site-selector {
			width: 120px;
		}
		.user-box {
			// position: absolute;
			display: flex;
			align-items: center;
			padding-right: 10px;
			// right: 0;
		}
	}
</style>