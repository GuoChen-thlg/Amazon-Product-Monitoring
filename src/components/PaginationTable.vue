<template>
	<div class="pagination-table-outer">
		<div class="control-box">
			<!-- <el-button class="trace-btn" type="primary" size="mini" plain>朴素按钮</el-button> -->
			<el-pagination
				layout="slot, total, sizes, prev, pager, next, jumper"
				@size-change="handleSizeChange"
				@current-change="paging"
				:page-sizes="(tableData.pagination&&tableData.pagination['page-sizes'])?tableData.pagination['page-sizes']:[100, 200, 400,800,1600]"
				:page-size="pagination['page-size']"
				:total="pagination.total"
				:hide-on-single-page="false"
			></el-pagination>
			<el-button-group>
				<el-col v-if="tableData.select" :span="10">
					<el-input placeholder="输入关键字搜索" size="mini" clearable v-model="search">
						<i slot="prefix" class="el-input__icon el-icon-search"></i>
					</el-input>
				</el-col>
				<el-button @click="exportexcel('xlsx')" size="mini">导出EXCEL</el-button>
				<el-button @click="exportexcel('csv')" size="mini">导出CSV</el-button>
			</el-button-group>
		</div>
		<div class="table-box">
			<el-table
				v-loading="tableData.loading"
				:data="filterData"
				:stripe="true"
				height="calc( 100vh - 213px)"
				style="width: 100%;min-height:600px;"
				id="keyword_table"
				:resizable="true"
				@cell-click="cellClick"
			>
				<el-table-column v-if="tableData.select?true:false" type="selection" width="80" align="right"></el-table-column>

				<template v-for="(item,index) in tableData.tableHeader">
					<el-table-column
						:prop="item.prop"
						:key="index"
						:index="index"
						:label="item.lable"
						:sortable="item.sortable?true:false"
						:min-width="item['min-width']"
						:show-overflow-tooltip="item['show-overflow-tooltip']?true:false"
						:class-name="item['class-name']?item['class-name']:''"
					>
						<template slot="header" slot-scope="{ column }">
							{{column.label}}
							<el-tooltip
								v-if="tableData.hint && tableData.hint[0].some(index => index === column.index)"
								effect="dark"
								placement="top"
								:content="tableData.hint[1].length === 1 ? tableData.hint[1][0] : tableData.hint[1][tableData.hint[0].findIndex(index => index === column.index)]"
							>
								<i class="el-icon-question"></i>
							</el-tooltip>
						</template>
						<template v-if="item.type=='image'" v-slot="scope">
							<span class="image_src">{{scope.row.img_url}}</span>
							<img :src="scope.row.img_url" width="40" height="40" />
						</template>
					</el-table-column>
				</template>
			</el-table>
		</div>
	</div>
</template>

<script>
	import exportExcel from '@/util/exportExcel'
	export default {
		name: '',
		props: {
			tableData: {
				type: Object,
				required: true
			},
			cellClick: {
				type: [Function, undefined],
				default: () => { }
			}
		},
		data() {
			return {
				pagingData: [],
				filterData: [],
				pagination: {
					total: 0,// 总条目数
					page: 1,// 当前页码
					'page-size': 100,// 每页条目数
				},
				search: ''
			}
		},
		methods: {
			/**
			 * 分页数据过滤
			 */
			paging(val) {
				this.pagination.page = val
				this.pagingData = this.tableData.allData.slice((val - 1) * this.pagination['page-size'], val * this.pagination['page-size'])
				this.filterData = this.pagingData
			},
			/**
			 * 每页条目数
			 */
			handleSizeChange(val) {
				this.pagination['page-size'] = val
				this.paging(this.pagination.page)
			},
			/**
			 * 导出文件
			 */
			exportexcel(suffix) {
				if (this.pagingData.length == 0) {
					this.$message({
						message: '暂无数据，无法导出',
						type: 'warning'
					});
				} else if (exportExcel(document.getElementById('keyword_table'), `${new Date().toLocaleDateString()}${new Date().toLocaleTimeString()}.${suffix}`)) {
					this.$message({
						message: '导出成功',
						type: 'success'
					});
					console.log('导出成功')
				} else {
					this.$message({
						message: '导出失败',
						type: 'error'
					});
				}
			},
		},
		watch: {
			'tableData.allData': function (val, oldval) {
				this.pagination.total = val.length
				if (oldval.length !== val.length) {
					this.paging(this.pagination.page)
				}
			},
			'search': function () {
				if (this.search.trim()) {
					let data = [...this.pagingData]
					this.filterData = data.filter((item) => {
						for (const key in item) {
							if (item.hasOwnProperty(key) && this.tableData.select && this.tableData.select.attr.some(i => i == key)) {
								if (item[key].toString().toLowerCase().includes(this.search.trim().toLowerCase())) {
									return true
								}
							}
						}
					})
				} else {
					this.filterData = this.pagingData
				}
			}
		},

	}
 </script>

 <style lang='scss' >
	.pagination-table-outer {
		.control-box {
			padding: 15px 20px;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-around;
		}
		.table-box {
			padding: 0 20px;
			& * {
				font-size: 12px;
			}
			.el-table__empty-text {
				position: absolute;
				left: 0;
				transform: translateX(50%);
			}
			.image_src {
				display: none;
			}
			i.el-icon-question {
				color: #409eff;
				margin-left: 5px;
			}
		}
	}
</style>			