import React, { useEffect, useState, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fetch from 'isomorphic-unfetch';
import { getAllData, getPage } from '../store/actions';
import { Spin } from 'antd';
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

// 判断DOM是否加载完
function getIsMounted(getPage) {
  // 用于模拟componentDidMount生命周期的flag
  const [isMounted, setMounted] = useState(false);
  useEffect(() => {
    // componentDidMount 生命周期获取一次localstorage的页数，纪录上次的加载
    if(!isMounted) {
      getPage()
      setMounted(true)
    }
  })
  return isMounted;
}

// 加载中组件
function Loading() {
  return <Spin
            style={{
                    position: 'absolute',
                    transform: 'translate(-50%, -50%)',
                    top: '50%',
                    left: '50%'
                  }}
            size="large" />;
}

// 搜索框加表格组件
function Main() {
  return <Fragment><SearchInput /><PackTable /></Fragment>;
}

// 主页组件
function Index({ getPage }) {
  let isMounted = getIsMounted(getPage);

  return (
    <Fragment>
      <Head title="pack download"></Head>
      {
        !isMounted ? Loading() : Main()
      }
    </Fragment>
  )
};

/**
 * @param {function} getPage 获取当前页数 
 */
const mapDispatchToProps = (dispatch) => {
  return {
    getPage: bindActionCreators(getPage, dispatch),
  }
};

export default connect(null, mapDispatchToProps)(Index);