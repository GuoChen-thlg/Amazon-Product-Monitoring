 <template>
	<div class="outer">
		<!-- 搜索框 -->
		<div style>
			<div class="search-box">
				<el-autocomplete
					placeholder="请输入关键词"
					v-model="keyword"
					class="input-with-select"
					@keyup.enter.native="search"
					:fetch-suggestions="querySearch"
					@select="handleSelect"
					:debounce="500"
					:trigger-on-focus="false"
					clearable
				>
					<el-select @change="selectSite" v-model="site.val" slot="prepend" placeholder="请选择">
						<template>
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
						</template>
					</el-select>
					<el-button @click="search" slot="append" icon="el-icon-search"></el-button>
				</el-autocomplete>
			</div>
			<!-- 控制板 -->
			<!-- <div class="control-box">
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
			</div>-->
		</div>
		<pagination-table :tableData="tableData" />
		<!-- <div class="table-box">
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
		</div>-->
	</div>
</template>

 <script>
	import PaginationTable from '@/components/PaginationTable.vue'
	import { searchKeyWord, fuzzyMatching } from '@/api'
	import { mapGetters } from 'vuex'
	import exportExcel from '@/util/exportExcel'
	export default {
		name: 'excavate',
		data() {
			return {
				site: {
					val: '',
					options: []
				},
				keyword: '',
				tableData: {
					loading: false,
					allData: [],
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
							'min-width': '135',
							sortable: true,
						}, {
							prop: 'monthlyTrend',
							lable: '过去30天趋势',
							'min-width': '125',
							sortable: true,
						}, {
							prop: 'quarterlyTrend',
							lable: '过去90天趋势',
							'min-width': '135',
							sortable: true,
						}, {
							prop: 'estimatedBroadSearchVolume',
							lable: '广泛匹配搜索量',
							'min-width': '135',
							sortable: true,
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
							'min-width': '145',
							sortable: true,
						}, {
							prop: 'exactAvgCpc',
							lable: '精确PPC建议出价',
							'min-width': '145',
							sortable: true,
						}, {
							prop: 'broadAvgCpc',
							lable: '广泛PPC建议出价',
							'min-width': '145',
							sortable: true,
						}, {
							prop: 'easeOfRankingScore',
							lable: '排名容易度',
							'min-width': '110',
							sortable: true,
						}, {
							prop: 'matches',
							lable: '相关度系数',
							'min-width': '105',
						}, {
							prop: 'hasUpdatedSearchVolume',
							lable: '自然搜索结果',
							'min-width': '125',
							sortable: true,
						}, {
							prop: 'sponsoredProductCount',
							lable: '投放广告商品数',
							'min-width': '135',
							sortable: true,
						}
					],
				},
			}
		},
		mounted() {
			this.site.val = this.$store.state.site
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
			 * 模糊查询触发函数
			 */
			querySearch(queryString, callback) {
				// 进行查询，请求api
				fuzzyMatching({
					station: this.site.val,
					keyword: queryString
				}).then(data => {
					// 传入结果
					callback(data.map(o => {
						return {
							value: o.keyword,
							address: o.keyword
						}
					}));
				}).catch(error => {
					callback([])
					console.log(error);
				})
			},
			/**
			 * 选中候选词
			 */
			handleSelect(keyword) {
				if (keyword) {
					this.keyword = keyword.address
				}
			},
			/**
			 * 关键词搜索
			 */
			search() {
				this.tableData.loading = false
				if (this.keyword.trim() !== '') {
					this.tableData.loading = true
					searchKeyWord({
						'shingles_searchTerm': this.keyword,
						'country_valuesArray': 'us',
						// 'paginate_pageSize': 100,

					}).then((data) => {
						if (data.data.data.total_count == 0) {
							this.tableData.loading = false
							this.$message({
								message: '没有该关键词数据',
								type: 'warning'
							});
						} else if (data.data && data.data.data && data.data.data.keyword) {
							this.tableData.allData = [
								data.data.data.keyword,
								...data.data.data.keywords
							]
							this.paging(this.pagination.page)
							this.tableData.loading = false
						} else {
							this.tableData.loading = false
						}
					}).catch(error => {
						this.tableData.loading = false
						console.log(error);
					})
				} else {
					this.$message({
						message: '请输入关键词，进行搜索',
						type: 'warning'
					});
				}
			},
			// /**
			//  * 分页方法
			//  */
			// paging(val) {
			// 	this.pagination.page = val
			// 	this.showTableData = this.tableData.slice((val - 1) * this.pagination['page-size'], val * this.pagination['page-size'])
			// },
			// // 设置每页数据条数
			// handleSizeChange(val) {
			// 	this.pagination['page-size'] = val
			// 	// 对当前数据分页
			// 	this.paging(this.pagination.page)
			// },
			// /**
			//  * 导出Excel
			//  */
			// exportexcel(suffix) {
			// 	if (this.showTableData.length == 0) {
			// 		this.$message({
			// 			message: '暂无数据，无法导出',
			// 			type: 'warning'
			// 		});
			// 	} else if (exportExcel(document.getElementById('keyword_table'), `${new Date().toLocaleDateString()}${new Date().toLocaleTimeString()}.${suffix}`)) {
			// 		this.$message({
			// 			message: '导出成功',
			// 			type: 'success'
			// 		});
			// 		console.log('导出成功');
			// 	} else {
			// 		this.$message({
			// 			message: '导出失败',
			// 			type: 'error'
			// 		});
			// 	}
			// }

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
			...mapGetters({
				stateSite: 'site'
			})
		},
		components: {
			'pagination-table': PaginationTable
		}
	}
 </script>

 <style lang='scss' scoped>
	.outer {
		.search-box {
			& > div {
				display: block;
			}
			width: 80%;
			margin: 30px auto 0;
			.el-select {
				width: 120px;
			}
		}
	}
</style>			