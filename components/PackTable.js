/**
 * 表格组件
 */
import React from 'react';
import { connect } from 'react-redux';
import { getPage, changePage } from '../store/actions';
import { bindActionCreators } from 'redux';
import { Table, Icon } from 'antd';
// 按字母排序
const sortByAlphabet = (a, b) => {
  return a.localeCompare(b);
}

// 按数字大小排序
const sortByNumber = (a, b) => {
  return a > b ? 1 : -1;
}

/**
 * 渲染下载图标
 * @param {string} url 下载链接
 * @param {string} type 图标的类型，用于渲染图标
 */
const renderDLIcon = (url, type) => {
  return !!url.trim() ? <a href={url}><Icon style={{ fontSize: '20px', marginLeft: type === 'download' ? '20px' :  '35px'}} type={type} /></a>: <span>no source</span>
}

// 表头
const columns = [
  {
    title: 'pack name',
    dataIndex: 'attributes.name',
    key: 'name',
    sorter: (a, b) => sortByAlphabet(a.attributes.name, b.attributes.name),
    defaultSortOrder: 'ascend'
  },
  {
    title: 'average',
    dataIndex: 'attributes.average',
    key: 'id',
    render: text => <span>{Math.round(text * 100) / 100} MSD</span>,
    sorter: (a, b) => sortByNumber(a.attributes.average, b.attributes.average)
  },
  {
    title: 'size',
    dataIndex: 'attributes.size',
    key: 'size',
    render: size => <span>{Math.round(size / 1024 / 1024 * 100) / 100} MB</span>,
    sorter: (a, b) => sortByNumber(a.attributes.size, b.attributes.size)
  },
  {
    title: 'download',
    dataIndex: 'attributes.download',
    key: 'download',
    render: (url) => renderDLIcon(url, 'download')
  },
  {
    title: 'google mirror',
    dataIndex: 'attributes.mirror',
    key: 'google mirror',
    render: (url) => renderDLIcon(url, 'cloud-download')
  }
]
/**
 * 图包表格组件
 * @param {Array} data 从后台获取的所有数据的数组
 * @param {page} page 当前页数，初始为从localstorage获取的页数
 * @param {Array} filterData 根据搜索关键词搜出来的数组
 * @param {string} search 输入的搜索关键词
 * @param {function} changePage 点页码的时候触发的acion 
 */
function PackTable({ data, page, filterData, search, changePage }) {
  const renderData = !!search ? filterData : data
  return (
    <Table
      pagination={{
        pageSize: 10,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        showSizeChanger: true,
        current: page,
        onChange: (e) => {
          window.localStorage.setItem('page', e)
          changePage(e)
        }
      }}
      rowKey={record => record.id}
      dataSource={renderData}
      columns={columns} />
  )
}

const mapStateToProps = (state) => {
  return {
    data: state.get('data').toJS(),
    page: state.get('page'),
    search: state.get('search'),
    filterData: state.get('filterData')
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPage: bindActionCreators(getPage, dispatch),
    changePage: bindActionCreators(changePage, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PackTable);