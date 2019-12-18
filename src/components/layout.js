import React from 'react'

import Helmet from 'react-helmet'

import './subtract.css'
import './style.css'
import Header from './header'
import Footer from './footer'
// import './index.css'
import { useStaticQuery, graphql } from "gatsby"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
    <main>
      <Helmet
        title={data.site.siteMetadata.title}
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' },
        ]}
      />
      <Header siteTitle={data.site.siteMetadata.title} />
      <script
        src="https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js"
        type="text/javascript"
        async=""
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono|IBM+Plex+Sans:400,400i,600"
        media="all"
      />
      <main className="page-content" aria-label="Content">
        {children}
      </main>

      <Footer />
    </main>
  )
}

export default Layout

