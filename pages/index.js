import React from 'react'
import {connect} from 'react-redux'
import {getAllData} from '../store/actions'
import fetch from 'isomorphic-unfetch'
import { Button } from 'antd'

const Index = ({ data }) => {
  return (
    <div>
      {
        data.map(item => (
          <div key={item.id}>pack: {item.attributes.name} SSR:  {item.attributes.average}  link: <a href={item.attributes.download}>DL link</a> mirror: <a href={item.attributes.mirror}>DL link</a></div>
        ))
      }
      <Button type="primary">Primary</Button>
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
    data: state.get('data').toJS()
  }
}

export default connect(mapStateToProps)(Index)