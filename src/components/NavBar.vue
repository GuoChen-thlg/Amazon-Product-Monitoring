<template>
	<div class="navbar-outer">
		<el-menu
			router
			mode="horizontal"
			text-color="#fff"
			active-text-color="#000"
			background-color="#409EFF"
			:default-active="$route.path"
		>
			<template v-for="(item, index) in navLink">
				<template v-if="verify(item.jurisdiction,true)">
					<template v-if="!item.submenu">
						<!-- 没有子菜单 -->
						<el-menu-item
							:index="`${item.toPath}`"
							:disabled="verify(item.jurisdiction,false)"
							:key="index"
						>
							{{item.label}}
							<!-- 锁 图标 -->
							<template v-if="verify(item.jurisdiction,false)">
								<svg
									t="1597387066852"
									class="icon"
									viewBox="0 0 1024 1024"
									version="1.1"
									xmlns="http://www.w3.org/2000/svg"
									p-id="1216"
									width="16"
									height="16"
								>
									<path
										d="M713.04314 394.841279l-33.486639 0 0-67.070491c0-93.874947-73.742441-167.623528-167.620458-167.623528-93.777733 0-167.572362 73.748581-167.572362 167.623528l0 67.070491-33.533711 0c-36.82466 0-67.019326 30.147594-67.019326 66.965091l0 335.251148c0 36.817497 30.194666 66.965091 67.019326 66.965091l402.212146 0c36.922897 0 67.069468-30.147594 67.069468-66.965091L780.111584 461.806369C780.113631 424.989896 749.966037 394.841279 713.04314 394.841279M511.937067 696.500388c-36.820567 0-67.019326-30.194666-67.019326-67.067421 0-36.875825 30.198759-67.070491 67.019326-67.070491 36.920851 0 67.070491 30.194666 67.070491 67.070491C579.007558 666.306746 548.857917 696.500388 511.937067 696.500388M615.877243 394.841279l-207.830211 0 0-67.070491c0-57.006285 46.933892-103.892081 103.889011-103.892081 57.053357 0 103.9412 46.885797 103.9412 103.892081L615.877243 394.841279z"
										p-id="1217"
									/>
								</svg>
							</template>
						</el-menu-item>
					</template>
					<template v-else>
						<!-- 有子菜单 -->
						<el-submenu :index="`${item.toPath}`" :key="index">
							<template slot="title">{{item.label}}</template>
							<template v-for="(menu,i) in item.submenu">
								<!-- 菜单项 -->
								<el-menu-item :index="menu.toPath" :key="i" :disabled="verify(menu.jurisdiction,false)">
									{{menu.label}}
									<!-- 锁 图标 -->
									<template v-if="verify(menu.jurisdiction,false)">
										<svg
											t="1597387066852"
											class="icon"
											viewBox="0 0 1024 1024"
											version="1.1"
											xmlns="http://www.w3.org/2000/svg"
											p-id="1216"
											width="16"
											height="16"
										>
											<path
												d="M713.04314 394.841279l-33.486639 0 0-67.070491c0-93.874947-73.742441-167.623528-167.620458-167.623528-93.777733 0-167.572362 73.748581-167.572362 167.623528l0 67.070491-33.533711 0c-36.82466 0-67.019326 30.147594-67.019326 66.965091l0 335.251148c0 36.817497 30.194666 66.965091 67.019326 66.965091l402.212146 0c36.922897 0 67.069468-30.147594 67.069468-66.965091L780.111584 461.806369C780.113631 424.989896 749.966037 394.841279 713.04314 394.841279M511.937067 696.500388c-36.820567 0-67.019326-30.194666-67.019326-67.067421 0-36.875825 30.198759-67.070491 67.019326-67.070491 36.920851 0 67.070491 30.194666 67.070491 67.070491C579.007558 666.306746 548.857917 696.500388 511.937067 696.500388M615.877243 394.841279l-207.830211 0 0-67.070491c0-57.006285 46.933892-103.892081 103.889011-103.892081 57.053357 0 103.9412 46.885797 103.9412 103.892081L615.877243 394.841279z"
												p-id="1217"
											/>
										</svg>
									</template>
								</el-menu-item>
							</template>
						</el-submenu>
					</template>
				</template>
			</template>
		</el-menu>
	</div>
</template>

 <script>
	export default {
		name: 'nav-bar',
		data() {
			return {
				nowPath: '',
				navLink: [
					{
						label: '首页',
						toPath: '/index',
						jurisdiction: {
							login: false,
							member: false,
						},

					},
					{
						label: '品类',
						toPath: '/category',
						jurisdiction: {
							login: true,
							member: false,
						},

					},
					{
						label: '产品',
						toPath: '/product',
						jurisdiction: {
							login: true,
							member: true,
						},
					},
					{
						label: '关键词',
						toPath: '/keyword',
						jurisdiction: {
							login: true,
							member: false,
						},
						submenu: [{
							label: '关键词挖掘',
							toPath: '/keyword/excavate',
							jurisdiction: {
								login: true,
								member: false,
							}
						},
						{
							label: '关键词选品',
							toPath: '/keyword_selection',
							jurisdiction: {
								login: true,
								member: true,
							}
						},
						{
							label: '关键词反查',
							toPath: '/keyword_pegging',
							jurisdiction: {
								login: true,
								member: true,
							}
						}
						]
					},
					{
						label: '评论',
						toPath: '/comment',
						jurisdiction: {
							login: false,
							member: false,
						},
					},
					{
						label: '个人中心',
						toPath: '/my',
						jurisdiction: {
							login: true,
							member: false,
						},
						submenu: [{
							label: '产品追踪',
							toPath: '/my/trace',
							jurisdiction: {
								login: true,
								member: false,
							}
						}]
					}
				]
			}
		},

		methods: {
			/**
			 * 验证权限
			 * 返回 BOOL 禁用菜单 结合 router 
			 * 未登录隐藏菜单，
			 * 已登录禁用菜单
			 * @param {bool}  bool true 判断登录状态 false 判断 登录 会员状态
			 */
			verify(jurisdiction, bool) {
				let user = this.$store.state.user
				return bool ? jurisdiction.login ? (user.login ? true : false) : true : jurisdiction.login ? (user.login ? (jurisdiction.member ? (user.member ? false : true) : false) : true) : false
			},

		},
		watch:{
			'route.path':()=>{
				console.log(this.$route.path);
			}
		}
	}
 </script>

<style lang="scss" scoped>
	.navbar-outer {
		margin-left: 30px;
		.el-menu {
			display: flex;
		}
	}
</style>			