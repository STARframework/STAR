import React from 'react'
import { Link } from "gatsby"
import Layout from '../components/layout'

class DSPage extends React.Component {
  state = { azMode: true }
  toggleMode = () => this.setState({ azMode: !this.state.azMode })
  render() {
    const { data } = this.props
    const { azMode } = this.state
    const DSQuery = azMode ? data.DSQueryAZ : data.DSQueryChron
    return (
      <Layout>
        <article className="post post-ds">
          <header className="post-header clearfix">
            <div className="post-head-wrap">
              {' '}
              <div className="post-head-content">
                <h1 className="post-title">Design Systems Gallery</h1>
                <p>
                  A comprehensive and curated list of design systems, style
                  guides and pattern libraries that you can use for inspiration.
                </p>
              </div>{' '}
              <img
                className="illustration"
                src="https://d33wubrfki0l68.cloudfront.net/c212c67984cc23c7dc3ebb51b9798db3af6c435f/f3cdb/images/illustration-ds.svg"
                width="94"
                height="86"
                alt="Design System Legos"
              />
            </div>{' '}
          </header>
          <ul className="filter">
            {' '}
            <li className={azMode && 'active'}>
              <a onClick={this.toggleMode}>
                A - Z <span className="number">({DSQuery.edges.length})</span>
              </a>
            </li>{' '}
            <li className={!azMode && 'active'}>
              <a onClick={this.toggleMode}>Most recent</a>
            </li>{' '}
          </ul>
          <div className="post-content holder">
            {DSQuery.edges.map(({ node: { fields, frontmatter } }) => (
              <a
                key={frontmatter.link}
                className="block block-ds"
                href={frontmatter.link}
                title={frontmatter.title}
                target="_blank"
              >
                {' '}
                <div className="img-wrap">
                  <img
                    src={'/' + frontmatter.image}
                    alt={frontmatter.title}
                    width="800"
                    height="400"
                  />
                </div>
                <div className="content">
                  {' '}
                  <h3>{frontmatter.company}</h3> <h2>{frontmatter.title}</h2>
                  <p className="clamp">{frontmatter.description}</p>{' '}
                </div>{' '}
              </a>
            ))}
          </div>
        </article>
      </Layout>
    )
  }
}

export default DSPage

export const pageQuery = graphql`
  query DSQuery {
    DSQueryAZ: allMarkdownRemark(
      filter: { id: { regex: "/_design-systems/" } }
      sort: { fields: [frontmatter___title], order: ASC }
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            company
            link
            image
            description
          }
          fields {
            slug
          }
        }
      }
    }
    DSQueryChron: allMarkdownRemark(
      filter: { id: { regex: "/_design-systems/" } }
      sort: { fields: [fields___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            company
            link
            image
            description
          }
          fields {
            slug
            date
          }
        }
      }
    }
  }
`
