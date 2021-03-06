import FileSaver from 'file-saver'
import XLSX from 'xlsx'

/**
 * 导出表格为excel格式
 * @param { DOM } table            // document.getElementById('table')
 * @param { string } fileName    // 文件名
 */
function exportExcel(table, fileName) {
	/* 从表生成工作簿对象 */
	const wb = XLSX.utils.table_to_book(table)
	/* 获取二进制字符串作为输出 */
	const wbout = XLSX.write(wb, {
		bookType: 'xlsx',
		bookSST: true,
		type: 'array',
	})
	try {
		// Blob 对象表示一个不可变、原始数据的类文件对象。
		// Blob 表示的不一定是JavaScript原生格式的数据。
		// File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
		// 返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
		// 设置导出文件名称
		FileSaver.saveAs(
			new Blob([wbout], { type: 'application/octet-stream' }),
			fileName
		)
	} catch (e) {
		if (typeof console !== 'undefined') console.log(e, wbout)
	}
	return wbout
}

export default exportExcel
