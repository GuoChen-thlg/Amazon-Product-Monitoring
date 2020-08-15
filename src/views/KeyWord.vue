 <template>
	<div class="outer">
		<!-- 搜索框 -->
		<div style>
			<div class="search-box">
				<el-input
					placeholder="请输入关键词"
					v-model="keyword"
					class="input-with-select"
					@keyup.enter.native="search"
					clearable
				>
					<el-select @change="selectSite" v-model="site.val" slot="prepend" placeholder="请选择">
						<template>
							<el-option
								v-for="item in site.options"
								:key="item.mark"
								:label="item.country"
								:value="item.mark"
							>
								<span :class="[`national_flag`,`icp-flag-${item.mark}`]"></span>
								{{item.country}}
							</el-option>
						</template>
					</el-select>
					<el-button @click="search" slot="append" icon="el-icon-search"></el-button>
				</el-input>
			</div>
			<!-- 控制板 -->
			<div class="control-box">
				<el-pagination
					layout="total, sizes, prev, pager, next, jumper"
					@size-change="handleSizeChange"
					:page-sizes="[100, 200, 400,800,1600]"
					:page-size="pagination['page-size']"
					@current-change="paging"
					:total="pagination.total"
					:hide-on-single-page="false"
				></el-pagination>
				<el-button-group>
				<el-button @click="exportexcel('xlsx')" size="mini">导出EXCEL</el-button>
				<el-button @click="exportexcel('csv')" size="mini">导出CSV</el-button>
				</el-button-group>
			</div>
		</div>
		<!-- Table -->
		<div class="table-box">
			<el-table
				v-loading="loading"
				:data="showTableData"
				:stripe="true"
				height="calc( 100vh - 213px)"
				style="width: 100%;min-height:600px"
				id="keyword_table"
			>
				<template v-for="(item,index) in tableHeader">
					<el-table-column
						:prop="item.prop"
						:key="index"
						:label="item.lable"
						sortable
						:min-width="item['min-width']"
						:show-overflow-tooltip="item['show-overflow-tooltip']?true:false"
					></el-table-column>
				</template>
			</el-table>
		</div>
	</div>
</template>

 <script>
	import { searchKeyWord } from '@/api'
	import exportExcel from '@/util/exportExcel'
	export default {
		name: 'KeyWord',
		data() {
			return {
				site: {
					val: this.$store.state.site,
					options: []
				},
				keyword: '',
				loading: false,
				// 表头
				tableHeader: [
					{
						prop: 'name',
						lable: '关键词',
						'min-width': '80'
					},
					{
						prop: 'estimatedExactSearchVolume',
						lable: '精确匹配搜索量',
						'min-width': '130'
					}, {
						prop: 'monthlyTrend',
						lable: '过去30天趋势',
						'min-width': '120'
					}, {
						prop: 'quarterlyTrend',
						lable: '过去90天趋势',
						'min-width': '130'
					}, {
						prop: 'estimatedBroadSearchVolume',
						lable: '广泛匹配搜索量',
						'min-width': '130'
					}, {
						prop: 'category',
						lable: '主类目',
						'min-width': '80'
					}, {
						prop: 'score',
						lable: '新品促销量参考',
						'min-width': '130'
					}, {
						prop: 'exactSuggestedBidMedian',
						lable: 'HSA建议出价',
						'min-width': '140'
					}, {
						prop: 'exactAvgCpc',
						lable: '精确PPC建议出价',
						'min-width': '140'
					}, {
						prop: 'broadAvgCpc',
						lable: '广泛PPC建议出价',
						'min-width': '140'
					}, {
						prop: 'easeOfRankingScore',
						lable: '排名容易度',
						'min-width': '105'
					}, {
						prop: 'matches',
						lable: '相关度系数',
						'min-width': '105'
					}, {
						prop: 'hasUpdatedSearchVolume',
						lable: '自然搜索结果',
						'min-width': '120'
					}, {
						prop: 'sponsoredProductCount',
						lable: '投放广告商品数',
						'min-width': '130'
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
		mounted() {
			this.site.options = this.$store.state.sites
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
				this.tableData = this.showTableData = []
				this.loading = false
				if (this.keyword.trim() !== '') {
					this.loading = true
					searchKeyWord({
						'shingles_searchTerm': this.keyword,
						'country_valuesArray': 'us',
						// 'paginate_pageSize': 100,

					}).then((data) => {
						if (data.data.data.total_count == 0) {
							this.loading = false
							this.$message({
								message: '没有该关键词数据',
								type: 'warning'
							});
						} else if (data.data && data.data.data && data.data.data.keyword) {
							this.tableData = [
								data.data.data.keyword,
								...data.data.data.keywords
							]
							this.pagination.total = this.tableData.length
							this.paging(this.pagination.page)
							this.loading = false
						} else {
							this.loading = false
						}
					}).catch(error => {
						this.loading = false
					})
				} else {
					this.$message({
						message: '请输入关键词，进行搜索',
						type: 'warning'
					});
				}
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
				// 对当前数据分页
				this.paging(this.pagination.page)
			},
			/**
			 * 导出Excel
			 */
			exportexcel(suffix) {
				if (this.showTableData.length == 0) {
					this.$message({
						message: '暂无数据，无法导出',
						type: 'warning'
					});
				} else if (exportExcel(document.getElementById('keyword_table'), `${new Date().toLocaleDateString()}${new Date().toLocaleTimeString()}.${suffix}`)) {
					this.$message({
						message: '导出成功',
						type: 'success'
					});
					console.log('导出成功');
				} else {
					this.$message({
						message: '导出失败',
						type: 'error'
					});
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
		}
	}
 </script>

 <style lang='scss' scoped>
	.outer {
		.search-box {
			width: 80%;
			margin: 30px auto 0;
			.el-select {
				width: 120px;
			}
		}
		.control-box {
			padding: 15px 20px;
			display: flex;
			align-items: center;
			justify-content: space-around;
		}
		.table-box {
			padding: 0 20px;
			& * {
				font-size: 12px;
			}
		}
	}
</style>			