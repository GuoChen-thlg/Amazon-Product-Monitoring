<template>
	<div class="outer">
		<!-- <div class="control-box">
			<el-pagination
				layout="total, sizes, prev, pager, next, jumper"
				@size-change="handleSizeChange"
				:page-sizes="[100, 200, 400,800,1600]"
				:page-size="tableData.pagination['page-size']"
				@current-change="paging"
				:total="tableData.pagination.total"
				:hide-on-single-page="false"
			></el-pagination>
			<el-button-group>
				<el-button @click="exportexcel('xlsx')" size="mini">导出EXCEL</el-button>
				<el-button @click="exportexcel('csv')" size="mini">导出CSV</el-button>
			</el-button-group>
		</div>
		<div class="table-box">
			<el-table
				v-loading="tableData.loading"
				:data="tableData.showTableData"
				:stripe="true"
				height="calc( 100vh - 213px)"
				style="width: 100%;min-height:600px;"
				id="keyword_table"
				:resizable="true"
			>
				<el-table-column type="selection" width="80" align="right"></el-table-column>
				<template v-for="(item,index) in tableData.tableHeader">
					<el-table-column
						:prop="item.prop"
						:key="index"
						:label="item.lable"
						:sortable="item.sortable?true:false"
						:min-width="item['min-width']"
						:show-overflow-tooltip="item['show-overflow-tooltip']?true:false"
					>
						<template v-if="item.type=='image'" #default="{scope}">
							<img :src="scope.row.img_url" width="40" height="40" />
						</template>
					</el-table-column>
				</template>
			</el-table>
		</div>-->
		<pagination-table :tableData="tableData" />
	</div>
</template>

<script>
	import PaginationTable from '@/components/PaginationTable.vue'
	import { traceList, getProducrs } from '@/api'
	import { mapGetters } from 'vuex'
	import exportExcel from '@/util/exportExcel'
	export default {
		name: 'trace',
		data() {
			return {
				tableData: {
					loading: true,
					// 总数据
					allData: [],
					// 展示数据
					showTableData: [],
					// 表头
					tableHeader: [
						{
							prop: 'asin',
							lable: '产品SKU',
							'min-width': '105'
						},
						{
							prop: 'name',
							lable: '产品名称',
							'min-width': '250',
							'show-overflow-tooltip': true,
						}, {
							prop: 'img_url',
							lable: '首图',
							type: 'image',
							'min-width': '80'
						}, {
							prop: 'title',
							lable: '产品标题',
							'min-width': '130',
							'show-overflow-tooltip': true,
						}, {
							prop: 'price',
							lable: '产品价格',
							'min-width': '100',
							sortable: true,
							event: 'click'
						}, {
							prop: 'bsn',
							lable: '排名',
							'min-width': '80',
							sortable: true
						}, {
							prop: 'node_ranking',
							lable: '节点排名',
							'min-width': '100',
							'show-overflow-tooltip': true,
							sortable: true
						}, {
							prop: 'reviews_rating',
							lable: '产品评分',
							'min-width': '140',
							sortable: true
						}, {
							prop: 'reviews_count',
							lable: '产品评论数量',
							'min-width': '140',
							sortable: true
						}, {
							prop: 'q_a',
							lable: '问答数',
							'min-width': '140',
							sortable: true
						}, {
							prop: 'brand',
							lable: '品牌名',
							'min-width': '105',
							sortable: true
						}, {
							prop: 'seller_Name',
							lable: '卖家',
							'min-width': '105'
						}, {
							prop: 'b_categroy',
							lable: '所属大类别',
							'min-width': '120'
						}, {
							prop: 's_categroy',
							lable: '所属小类别',
							'min-width': '130'
						},
						{
							prop: 'launche_Time',
							lable: '上架时间',
							'min-width': '130',
							sortable: true
						},
						{
							prop: 'descr',
							lable: '描述',
							'min-width': '130',
							'show-overflow-tooltip': true,
						},
						{
							prop: 'variation_asins',
							lable: '产品变体',
							'min-width': '130',
							'show-overflow-tooltip': true,
						},
						{
							prop: 'parernt_asin',
							lable: '父级ASIN',
							'min-width': '130'
						},
						{
							prop: 'stock',
							lable: '库存',
							'min-width': '130',
							sortable: true
						},
						{
							prop: 'num_sellers',
							lable: '卖家数量',
							'min-width': '130',
							sortable: true
						},
						{
							prop: 'delivery',
							lable: '配送方式',
							'min-width': '130'
						},
						{
							prop: 'crawl_time',
							lable: '记录时间',
							'min-width': '130'
						}
					],
					// 分页器配置
					// pagination: {
					// 	'page-sizes': []
					// },
					select: {// 是否开启搜索框
						attr: ['price'],//搜索匹配属性
					}
				},
				echartsData: {}

			}
		},
		created() {
			this.getTraceProducts()
		},
		methods: {
			/**
			 * 获取追踪产品信息
			 */
			getTraceProducts() {
				this.tableData.loading = true
				traceList({ 'u_name': this.u_name }).then((data) => {
					if (data.code === '200') {
						getProducrs(data.data.join(',')).then(dataProducrs => {
							if (dataProducrs.code == 200) {
								this.tableData.allData = dataProducrs.rows
								this.tableData.loading = false
							} else {
								this.tableData.loading = false
							}
						}).catch(error => {
							this.tableData.loading = false
						})
					} else {
						this.tableData.loading = false
					}
				}).catch(error => {
					this.tableData.loading = false
				})
			},
			// /**
			//  * 分页方法
			//  */
			// paging(val) {
			// 	this.tableData.pagination.page = val
			// 	this.tableData.showTableData = this.tableData.ProducrsList.slice((val - 1) * this.tableData.pagination['page-size'], val * this.tableData.pagination['page-size'])
			// },
			// // 设置每页数据条数
			// handleSizeChange(val) {
			// 	this.tableData.pagination['page-size'] = val
			// 	// 对当前数据分页
			// 	this.paging(this.tableData.pagination.page)
			// },
			// /**
			//  * 导出Excel
			//  */
			// exportexcel(suffix) {
			// 	if (this.tableData.showTableData.length == 0) {
			// 		this.$message({
			// 			message: '暂无数据，无法导出',
			// 			type: 'warning'
			// 		});
			// 	} else if (exportExcel(document.getElementById('keyword_table'), `${new Date().toLocaleDateString()}${new Date().toLocaleTimeString()}.${suffix}`)) {
			// 		this.$message({
			// 			message: '导出成功',
			// 			type: 'success'
			// 		});
			// 		console.log('导出成功')
			// 	} else {
			// 		this.$message({
			// 			message: '导出失败',
			// 			type: 'error'
			// 		});
			// 	}
			// }
		},
		computed: {
			...mapGetters({
				u_name: 'u_name'
			})
		},
		components: {
			'pagination-table': PaginationTable
		}

	}
 </script>

 <style lang='scss'>
	
</style>			