<template>
	<div class="outer">
		<pagination-table :tableData="tableData" :cellClick="cellClick" />
		<el-dialog title :visible.sync="dialogVisible" width="70%" :before-close="done=>{done()}">
			<span>这是一段信息</span>
		</el-dialog>
	</div>
</template>

<script>
	import {
		text
	} from '@/api'
	import PaginationTable from '@/components/PaginationTable.vue'
	export default {
		data: () => {
			return {
				dialogVisible: false,
				tableData: {
					loading: true,
					// 全部数据 
					allData: [],
					// 表头
					tableHeader: [{
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
						'min-width': '115',
						sortable: true,
						event: 'click',
						'class-name': 'clickable cursor ',
					}, {
						prop: 'bsn',
						lable: '排名',
						'min-width': '90',
						sortable: true,
						'class-name': 'clickable cursor ',
					}, {
						prop: 'node_ranking',
						lable: '节点排名',
						'min-width': '100',
						'show-overflow-tooltip': true,
						sortable: true,
						'class-name': 'clickable cursor ',
					}, {
						prop: 'reviews_rating',
						lable: '产品评分',
						'min-width': '140',

						sortable: true,
						'class-name': 'clickable cursor ',
					}, {
						prop: 'reviews_count',
						lable: '产品评论数量',
						'min-width': '140',
						sortable: true,
						'class-name': 'clickable cursor ',
					}, {
						prop: 'q_a',
						lable: '问答数',
						'min-width': '140',
						sortable: true,
						'class-name': 'clickable cursor ',
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
						prop: 'variation_asins',
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
					// ? 提示信息
					hint: [
						[4, 5],
						['点击查看价格变化趋势', '点击查看排名变化趋势']
					],
					// 分页器配置
					pagination: {
						// 'page-sizes': [10,30]
					},
					select: { // 是否开启搜索框
						attr: ['price'], //搜索匹配属性
					}
				},
			}
		},
		created() {
			setTimeout(() => {
				fetch('/data.json').then(res => res.json()).then(res => {
					this.tableData.allData = res.data
					this.tableData.pagination.total = res.data.length
					this.tableData.loading = false
				})
			}, 3000)
		},
		methods: {
			cellClick(row, column, cell, event) {
				if (column.className.includes('clickable')) {
					this.dialogVisible = true
					console.log(row.asin);
					console.log(column.property);
				}
			},
		},

		components: {
			'pagination-table': PaginationTable
		}
	}
</script>
<style lang='scss' >
	.clickable {
		color: #f57706;
	}
</style>
<style lang='scss' scoped>

</style>
