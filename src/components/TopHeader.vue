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
						:key="item.mark"
						:label="item.country"
						:value="item.mark"
						:disabled="item.disabled"
					>
						<span :class="[`national_flag`,`icp-flag-${item.mark}`]"></span>
						{{item.country}}
					</el-option>
				</el-select>
			</div>
			<div class="menu">
				<nav-bar />
			</div>
		</div>
		<div class="user-box">
			<template v-if="!$store.getters.isInlogin">
				<router-link to="/login" tag="span" class="cursor" title="登陆">登录</router-link>|
				<router-link to="/register" tag="span" class="cursor" title="注册">注册</router-link>
			</template>
			<template v-else>
				{{Uname}}
				<el-dropdown @command="handle">
					<span class="el-dropdown-link">
						<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="QUIT">退出</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</template>
		</div>
	</div>
</template>


<script>
	import Navbar from './NavBar'
	import { mapGetters } from 'vuex'
	export default {
		name: 'top-header',
		data() {
			return {
				site: {
					val: this.$store.state.site,
					options: [],

				}
			}
		},
		mounted() {
			this.site.options = this.$store.state.sites
		},
		methods: {
			/**
			 * 选择站点
			 * 设置站点到store
			 */
			selectSite(value) {
				this.$store.commit('setSite', value)
			},
			/**
			 * 用户下拉菜单
			 * 已废弃
			 * 
			 */
			handle(command) {
				switch (command) {
					case 'QUIT':
						console.log('退出');
						window.sessionStorage.removeItem('user')
						this.$store.commit('setUser', {
							member: false,
							login: false,
							name: '',
							token: '',
						})
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
			},

		},
		computed: {
			...mapGetters({
				stateSite: 'site',
				Uname: 'u_name'
			}),
		},
		components: {
			'nav-bar': Navbar
		}
	}
</script>

<style lang="scss" scoped>
	.topheader-outer {
		display: flex;
		height: 60px;
		align-items: center;
		justify-content: space-between;
		.logo {
			width: 200px;
			text-align: center;
			cursor: pointer;
		}
		.main {
			width: 800px;
			display: flex;
			align-items: center;
		}
		.site-selector {
			width: 120px;
		}
		.user-box {
			padding-right: 60px;
			min-width: 200px;
			text-align: right;
			color: #fff;
			span{
				padding:5px 10px;
			}
			.router-link-active,
			span:hover {
				color: #000;
			}
		}
	}
</style>