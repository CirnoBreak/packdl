import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Head from '../components/head';
import { getAllData, getPage, changePage, inputSearch } from '../store/actions';
import fetch from 'isomorphic-unfetch';
import { debounce } from 'lodash';
import { bindActionCreators } from 'redux';
import { Table, Input, Row, Icon } from 'antd';

const sortByAlphabet = (a, b) => {
  return a.localeCompare(b)
}

const columns = [
  {
    title: 'pack name',
    dataIndex: 'attributes.name',
    key: 'name',
    sorter: (a, b) => a.attributes.name.localeCompare(b.attributes.name),
    defaultSortOrder: 'ascend'
  },
  {
    title: 'average',
    dataIndex: 'attributes.average',
    key: 'id',
    render: text => <span>{Math.round(text * 100) / 100} MSD</span>,
    sorter: (a, b) => a.attributes.average - b.attributes.average > 0 ? 1 : -1
  },
  {
    title: 'size',
    dataIndex: 'attributes.size',
    key: 'size',
    render: size => <span>{Math.round(size / 1024 / 1024 * 100) / 100} MB</span>,
    sorter: (a, b) => a.attributes.size - b.attributes.size > 0 ? 1 : -1
  },
  {
    title: 'download',
    dataIndex: 'attributes.download',
    key: 'download',
    render: text => <a href={text}><Icon style={{ fontSize: '20px', marginLeft: '20px'}} type="download" /></a>
  },
  {
    title: 'mirror',
    dataIndex: 'attributes.mirror',
    key: 'mirror',
    render: item => <a href={item}><Icon style={{ fontSize: '20px', marginLeft: '10px'}} type="cloud-download" /></a>
  }
]

let isMounted = false;

function Index({ data, page, filterData, search, getPage, changePage, inputSearch }) {
  useEffect(() => {
    if(!isMounted) {
      getPage()
      isMounted = true;
    }
  })
  
  const Search = Input.Search;
  const renderData = !!search ? filterData : data
  return (
    <div>
      <Head title="pack download"></Head>
      <Row type="flex" justify="end">
        <Search
          style={{ marginTop: 50, marginBottom: 20, width: 300, marginRight: 10}}
          placeholder="input the pack name."
          onSearch={(v, e) => inputSearch(v)}
          >
        </Search>
      </Row>
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
    </div>
  )
}

Index.getInitialProps = async ({ store }) => {
  const reqInfo = await fetch('https://etternaapi.xnihilo.live/v2/packs')
  const { data } = await reqInfo.json()
  store.dispatch(getAllData(data))
  return {}
}

const mapStateToProps = (state) => {
  return {
    data: state.get('data').toJS(),
    page: state.get('page'),
    search: state.get('search'),
    filterData: state.get('filterData')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPage: bindActionCreators(getPage, dispatch),
    changePage: bindActionCreators(changePage, dispatch),
    inputSearch: bindActionCreators(inputSearch, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)