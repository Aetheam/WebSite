
import React, { ReactElement } from 'react'
import Layout from '../components/baseLayout'
import type { NextPageWithLayout } from './_app'
const Page: NextPageWithLayout = () => {
  return <p>hello world</p>
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Page