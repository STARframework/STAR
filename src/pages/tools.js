import React from 'react'
import { Link } from "gatsby"
import Layout from '../components/layout'

class ToolsPage extends React.Component {
  state = { currentTag: 'all' }
  toggleMode = tag => () => this.setState({ currentTag: tag })
  render() {
    const { data } = this.props
    const { allMarkdownRemark } = data
    const { edges } = allMarkdownRemark

    const { currentTag } = this.state
    let tags = new Set()
    edges.forEach(
      ({ node }) =>
        node.frontmatter.tags &&
        node.frontmatter.tags.forEach(tag => tags.add(tag))
    )
    tags = Array.from(tags) // .sort((a, b) => a > b)
    const tools =
      currentTag === 'all'
        ? edges
        : edges.filter(edge => edge.node.frontmatter.tags.includes(currentTag))
    return (
      <Layout>
        <article className="post post-tools">
          <header className="post-header clearfix">
            <div className="post-head-wrap">
              {' '}
              <div className="post-head-content">
                <h1 className="post-title">Tools and Resources</h1>
                <p>
                  An ever growing list of design and development tools and
                  plugins to help you build, maintain, and organize your own
                  design system.
                </p>
              </div>{' '}
              <img
                className="illustration"
                src="https://d33wubrfki0l68.cloudfront.net/6a096d617ad46fcb522c647cf847af91f2982b9d/3c13a/images/illustration-tools.svg"
                width="94"
                height="86"
                alt="Design System Tools"
              />
            </div>{' '}
          </header>
          <ul className="filter">
            {' '}
            <li className={currentTag === 'all' && 'active'}>
              <a onClick={this.toggleMode('all')}>
                All <span className="number">({edges.length})</span>
              </a>
            </li>{' '}
            {tags.map(tag => (
              <li key={tag} className={tag === currentTag && 'active'}>
                <a onClick={this.toggleMode(tag)}>
                  <span className="number">{capitalizeFirstLetter(tag)}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="post-content holder">
            {tools.map(art => (
              <a
                className="block block-tools"
                href={art.node.frontmatter.link}
                title={art.node.frontmatter.title}
                target="_blank"
                key={art.node.fields.slug}
              >
                {' '}
                <div className="img-wrap">
                  <img
                    src={'/' + art.node.frontmatter.image}
                    alt={art.node.frontmatter.title}
                    width="800"
                    height="400"
                  />
                </div>{' '}
                <div className="content">
                  {' '}
                  <h2>{art.node.frontmatter.title}</h2>{' '}
                  <p className="clamp">{art.node.frontmatter.description}</p>{' '}
                </div>{' '}
              </a>
            ))}
          </div>
        </article>
      </Layout>
    )
  }
}

export default ToolsPage

export const pageQuery = graphql`
  query ToolsQuery {
    allMarkdownRemark(
      filter: { id: { regex: "/_tools/" } }
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
            tags
            author
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

function capitalizeFirstLetter(string) {
  return string
    .split('-')
    .map(str => str.charAt(0).toUpperCase() + str.slice(1))
    .join(' ')
}
