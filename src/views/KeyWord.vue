 <template>
	<div class="outer">
		<div class="search-box">
			<el-input placeholder="请输入内容" v-model="keyword" class="input-with-select">
				<el-select @change="selectSite" v-model="site.val" slot="prepend" placeholder="请选择">
					<template>
						<el-option
							v-for="item in site.options"
							:key="item.value"
							:label="item.country"
							:value="item.mark"
						></el-option>
					</template>
				</el-select>

				<el-button @click="search" slot="append" icon="el-icon-search"></el-button>
			</el-input>
		</div>
		<div class="paging-box block">
			<el-pagination
				layout="total, sizes, prev, pager, next, jumper"
				@size-change="handleSizeChange"
				:page-sizes="[50,100, 200, 300, 400]"
				:page-size="pagination['page-size']"
				@current-change="paging"
				:total="pagination.total"
				:hide-on-single-page="false"
			></el-pagination>
		</div>
		<div class="table-box">
			<el-table
				v-loading="loading"
				:data="showTableData"
				:stripe="true"
				height="500"
				style="width: 100%"
			>
				<template v-for="(item,index) in tableHeader">
					<el-table-column
						:prop="item.prop"
						:key="index"
						:fixed="item.fixed?true:null"
						:label="item.lable"
						sortable
						width="140"
					></el-table-column>
				</template>
			</el-table>
		</div>
	</div>
</template>

 <script>
	import { searchKeyWord } from '@/api'
	export default {
		name: 'KeyWord',
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
				},
				keyword: '',
				loading: false,
				// 表头
				tableHeader: [
					{
						prop: 'name',
						lable: '关键词',
						fixed: true,
					},
					{
						prop: 'estimatedExactSearchVolume',
						lable: '精确匹配搜索量',
					}, {
						prop: 'quarterlyTrend',
						lable: '过去30天趋势',
					}, {
						prop: 'monthlyTrend',
						lable: '过去90天趋势',
					}, {
						prop: 'broadSearchVolume',
						lable: '广泛匹配搜索量',
					}, {
						prop: 'category',
						lable: '主类目',
					}, {
						prop: 'score',
						lable: '新品促销量参考',
					}, {
						prop: 'hasUpdatedCpc',
						lable: 'HSA建议出价',
					}, {
						prop: 'exactAvgCpc',
						lable: '精确PPC建议出价',
					}, {
						prop: 'broadAvgCpc',
						lable: '广泛PPC建议出价',
					}, {
						prop: 'easeOfRankingScore',
						lable: '排名容易度',
					}, {
						prop: 'matches',
						lable: '相关度系数',
					}, {
						prop: 'hasUpdatedSearchVolume',
						lable: '自然搜索结果',
					}, {
						prop: 'sponsoredProductCount',
						lable: '投放广告商品数',
					}
				],
				// 原始数据
				tableData: [],
				// 展示数据
				showTableData: [],
				// 分页器配置
				pagination: {
					total: 0,// 总条目数
					page: 1,// 当前页码
					'page-size': 100,// 每页条目数

				}

			}
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
			 * 关键词搜索
			 */
			search() {
				this.loading = true
				searchKeyWord({
					'shingles_searchTerm': this.keyword,
					'country_valuesArray': 'us'
				}).then((data) => {
					if (data.data && data.data.data && data.data.data.keyword && data.data.data.keywords) {
						this.tableData = [
							data.data.data.keyword,
							...data.data.data.keywords
						]
						this.pagination.total = this.tableData.length
						this.paging(this.pagination.page)
						this.loading = false
					}
					console.dir(data.data.data.keyword);
				})

			},
			/**
			 * 分页方法
			 */
			paging(val) {
				this.pagination.page = val
				this.showTableData = this.tableData.slice((val - 1) * this.pagination['page-size'], val * this.pagination['page-size'])
			},
			// 设置每页数据条数
			handleSizeChange(val) {
				this.pagination['page-size'] = val
				this.paging(this.pagination.page)
			},

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
		}
	}
 </script>

 <style lang='scss' scoped>
	.outer {
		.search-box {
			width: 80%;
			margin: 30px auto 0;
			.el-select {
				width: 90px;
			}
		}
		.paging-box {
			padding: 15px 20px;
		}
		.table-box {
			padding: 0 20px;
			// overflow: auto;
			// height: 550px;
			& * {
				font-size: 12px;
			}
		}
	}
</style>			