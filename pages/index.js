import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllData, getPage, changePage } from '../store/actions';
import fetch from 'isomorphic-unfetch';
import { bindActionCreators } from 'redux';
import { Table, Input, Row } from 'antd';

const columns = [
  {
    title: 'pack name',
    dataIndex: 'attributes.name',
    key: 'name'
  },
  {
    title: 'average',
    dataIndex: 'attributes.average',
    key: 'id',
    render: text => <span>{Math.round(text * 100) / 100} MSD</span>
  },
  {
    title: 'size',
    dataIndex: 'attributes.size',
    key: 'size',
    render: size => <span>{Math.round(size / 1024 / 1024 * 100) / 100} MB</span>
  },
  {
    title: 'download',
    dataIndex: 'attributes.download',
    key: 'download',
    render: text => <a href={text}>download</a>
  },
  {
    title: 'mirror',
    dataIndex: 'attributes.mirror',
    key: 'mirror',
    render: item => <a href={item}>mirror</a>
  }
]

let isMounted = false;

function Index({ data, page, getPage, changePage }) {
  useEffect(() => {
    if(!isMounted) {
      getPage()
      isMounted = true;
    }
  })
  
  const Search = Input.Search;
  return (
    <div>
      <Row type="flex" justify="end">
        <Search
          style={{ marginTop: 50, marginBottom: 20, width: 300, marginRight: 10}}
          placeholder="input the pack name."
          
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
        dataSource={data}
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
    page: state.get('page')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPage: bindActionCreators(getPage, dispatch),
    changePage: bindActionCreators(changePage, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)