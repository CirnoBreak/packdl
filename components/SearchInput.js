/**
 * 搜索组件
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Input } from 'antd';
import { bindActionCreators } from 'redux';
import { inputSearch } from '../store/actions'
import { useDebounce } from 'use-debounce';

/**
 * 搜索操作,防抖500毫秒执行
 * @param {function} inputSearch 搜索的action
 * @param {string} searchText 搜索的关键词
 */
function useSearch(inputSearch, searchText) {
  const debounceSearchText = useDebounce(searchText, 500);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(
    () => {
      isMounted ?
        inputSearch(debounceSearchText) :
        setIsMounted(true)
    },
    [debounceSearchText]
  );
  return debounceSearchText;
}

/**
 * 搜索组件
 * @param {function} inputSearch 输入关键词后按下回车或者图标后搜索的action 
 */
function SearchInput({ inputSearch }) {
  const [searchText, setSearchText] = useState('');
  useSearch(inputSearch, searchText);
  return (
    <Row type="flex" justify="end">
      <Input
        style={{ marginTop: 50, marginBottom: 20, width: 300, marginRight: 10}}
        placeholder="input the pack name."
        onChange={(e) => setSearchText(e.target.value)}
        >
      </Input>
    </Row>
  )
};

/**
 * @param {function} inputSearch 按下回车或者点搜索按钮后进行搜索的方法
 */
const mapDispatchToProps = (dispatch) => {
  return {
    inputSearch: bindActionCreators(inputSearch, dispatch)
  }
};

export default connect(null, mapDispatchToProps)(SearchInput);