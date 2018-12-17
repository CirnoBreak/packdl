import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fetch from 'isomorphic-unfetch';
import { getAllData, getPage } from '../store/actions';
import Head from '../components/head';
import SearchInput from '../components/SearchInput';
import PackTable from '../components/PackTable';

// 服务端直接请求
Index.getInitialProps = async ({ store }) => {
  const reqInfo = await fetch('https://etternaapi.xnihilo.live/v2/packs')
  const { data } = await reqInfo.json()
  store.dispatch(getAllData(data))
  return {}
};

// 用于模拟componentDidMount生命周期的flag
let isMounted;

function Index({ getPage }) {
  useEffect(() => {
    // componentDidMount 生命周期获取一次localstorage的页数，纪录上次的加载
    if(!isMounted) {
      getPage()
      isMounted = true;
    }
  })
  
  return (
    <>
      <Head title="pack download"></Head>
      <SearchInput />
      <PackTable />
    </>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPage: bindActionCreators(getPage, dispatch),
  }
};

export default connect(null, mapDispatchToProps)(Index);