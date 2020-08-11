<template>
	<div id="app">
		<TopHeader v-show="isShowTopHeader" />
		<router-view />
	</div>
</template>
<script>
	import TopHeader from './components/TopHeader'
	export default {
		name: 'App',
		data() {
			return {
				isShowTopHeader: true
			}
		},
		components: { TopHeader },
		watch: {
			'$route': function (to) {
				this.isShowTopHeader = !to.meta.isNOShowTopHeader
			}
		}
	}
</script>


<style >
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	ul,
	ol,
	li {
		list-style: none;
	}
	a {
		text-decoration: none;
	}
	.outer {
		padding-top: 60px;
	}
</style>
