import { Icon } from 'antd';

// 按字母排序
const sortByAlphabet = (a, b) => {
  return a.localeCompare(b);
};

// 按数字大小排序
const sortByNumber = (a, b) => {
  return a > b ? 1 : -1;
};

/**
 * 渲染下载图标
 * @param {string} url 下载链接
 * @param {string} type 图标的类型，用于渲染图标
 */
const renderDLIcon = (url, type) => {
  return !!url.trim() ? <a href={url}><Icon style={{ fontSize: '20px', marginLeft: type === 'download' ? '20px' :  '35px'}} type={type} /></a>: <span>no source</span>
};

export const columns = [
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
];