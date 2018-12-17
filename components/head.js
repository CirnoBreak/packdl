/**
 * HTML头组件
 */
import React from 'react'
import NextHead from 'next/head'
import { string } from 'prop-types'

const Head = props => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{props.title || ''}</title>
    {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
    <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />
    <link rel="icon" href="/static/favicon.ico" />
    
  </NextHead>
)

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string
}

export default Head
