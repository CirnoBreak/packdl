/**
 * 表格组件
 */
import React from 'react';
import { connect } from 'react-redux';
import { getPage, changePage } from '../store/actions';
import { bindActionCreators } from 'redux';
import { Table } from 'antd';
import { columns } from './packTableColumns';

/**
 * 改变页数时触发的函数
 * @param {number} page 当前选中的页数
 * @param {function} changePage 修改页数
 */
function onPageChange(page, changePage) {
  window.localStorage.setItem('page', page)
  changePage(page)
}

/**
 * 图包表格组件
 * @param {Array} data 从后台获取的所有数据的数组
 * @param {page} page 当前页数，初始为从localstorage获取的页数
 * @param {Array} filterData 根据搜索关键词搜出来的数组
 * @param {string} search 输入的搜索关键词
 * @param {function} changePage 点页码的时候触发的acion 
 */
function PackTable({ data, page, filterData, search, changePage }) {
  /**
   * 表格要渲染的数据
   * 输入搜索关键词不为空或者完全空格时为筛选的数据
   * 否则为默认请求到的所有数据
   * @param {string} search 搜索关键词
   * @param {Array} filterData 搜索后筛选的数据
   * @param {Array} data 初始化应用时请求的数据(所有)
   */
  const renderData = !!search ? filterData : data
  return (
    <Table
      pagination={{
        pageSize: 10,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        showSizeChanger: true,
        current: page,
        onChange: (page) => onPageChange(page, changePage),
        onShowSizeChange: (page, pagesize) => {
        },
        defaultPageSize: 10,
        pageSizeOptions: ['10', '25', '50', '100']
      }}
      rowKey={record => record.id}
      dataSource={renderData}
      columns={columns} />
  )
}

/**
 * @param {Array} data 初始获取的所有数据
 * @param {number} page 当前页数
 * @param {string} search 搜索关键词
 * @param {Array} filterData 搜索后筛选的数组  
 */
const mapStateToProps = (state) => {
  return {
    data: state.get('data').toJS(),
    page: state.get('page'),
    search: state.get('search'),
    filterData: state.get('filterData')
  }
};

/**
 * @param {function} getPage 获取当前页数
 * @param {function} changePage 改变当前页数 
 */
const mapDispatchToProps = (dispatch) => {
  return {
    getPage: bindActionCreators(getPage, dispatch),
    changePage: bindActionCreators(changePage, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PackTable);