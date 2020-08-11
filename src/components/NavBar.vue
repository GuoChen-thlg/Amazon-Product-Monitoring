 <template>
	<div class="navbar-outer">
		<template v-for="(item, index) in navLink">
			<router-link class="tab-control" :to="item.toPath" tag="div" :key="index">{{item.title}}</router-link>
		</template>
	</div>
</template>

 <script>
	export default {
		name: 'NavBar',
		data() {
			return {
				navLink: [
					{
						title: '品类',
						toPath: '/1',


					},
					{
						title: '产品',
						toPath: '/2',


					},
					{
						title: '关键词',
						toPath: '/keyword',


					}, {
						title: '评论',
						toPath: '/4',
					}
				]
			}
		},
		beforeCreate() { },
		created() { },
		beforeMount() { },
		mounted() { },
		beforeUpdate() { },
		updated() { },
		activated() { },
		deactivated() { },
		beforeDestroy() { },
		destroyed() { },
	}
 </script>

<style lang="scss" scoped>
	.navbar-outer {
		margin-left: 30px;

		display: flex;
		.tab-control {
			height: 40px;
			padding: 0 15px;
			line-height: 40px;
			cursor: pointer;
			border-radius: 5px;
			&:hover {
				background-color: aquamarine;
			}
		}
		.router-link-active {
			background-color: aquamarine;
		}
	}
</style>			