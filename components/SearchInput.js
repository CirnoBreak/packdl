/**
 * 搜索组件
 */
import React from 'react';
import { connect } from 'react-redux';
import { Row, Input } from 'antd';
import { bindActionCreators } from 'redux';
import { inputSearch } from '../store/actions'

// 获取antd Search组件
const Search = Input.Search;

/**
 * 搜索组件
 * @param {function} inputSearch 输入关键词后按下回车或者图标后搜索的action 
 */
function SearchInput({ inputSearch }) {
  return (
    <Row type="flex" justify="end">
      <Search
        style={{ marginTop: 50, marginBottom: 20, width: 300, marginRight: 10}}
        placeholder="input the pack name."
        onSearch={(v, e) => inputSearch(v)}
        >
      </Search>
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