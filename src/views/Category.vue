<template>
	<div class="outer">
		<el-container>
			<el-aside width="220px">
				<el-menu default-active="1" @select="selectSidebar">
					<template v-for="(item,index) in sidebarList">
						<el-menu-item :index="`${item.value}`" :key="index" class="menu-item">
							<span slot="title">{{item.label}}</span>
						</el-menu-item>
					</template>
				</el-menu>
			</el-aside>
			<el-main>主</el-main>
		</el-container>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	
	export default {
		name: 'category',
		data() {
			return {
			}
		},
		methods: {
			/**
			 * 侧边栏选项
			 */
			selectSidebar(val) {
				console.log(val);
			},
		},
		computed: {
			...mapGetters('category',['sidebarList'])
		}
	}
 </script>

 <style lang="scss" scoped>
	.outer {
		.menu-item {
			height: 30px;
			line-height: 30px;
		}
	}
</style>	