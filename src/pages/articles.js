import React from 'react'
import { Link } from "gatsby"
import Layout from '../components/layout'

class ArticlePage extends React.Component {
  state = { currentTag: 'all' }
  toggleMode = tag => () => this.setState({ currentTag: tag })
  render() {
    // const { data: { : { edges } } } = this.props
    const { data } = this.props
    const { allMarkdownRemark } = data
    const { edges } = allMarkdownRemark

    const { currentTag } = this.state
    console.log({ edges })
    let tags = new Set()
    edges.forEach(
      ({ node }) =>
        node.frontmatter.tags &&
        node.frontmatter.tags.forEach(tag => tags.add(tag))
    )
    tags = Array.from(tags).sort((a, b) => a > b)
    const articles =
      currentTag === 'all'
        ? edges
        : edges.filter(edge => edge.node.frontmatter.tags.includes(currentTag))
    return (
      <Layout>
        <article className="post post-articles">
          <header className="post-header clearfix">
            <div className="post-head-wrap">
              {' '}
              <div className="post-head-content">
                <h1 className="post-title">Articles</h1>
                <p>
                  An index of insightful articles about design systems. If
                  you've written an article that you want to add here, just
                  tweet me at{' '}
                  <a href="https://twitter.com/jadlimcaco" title="My Twitter">
                    @jadlimcaco
                  </a>
                  .
                </p>
              </div>{' '}
              <img
                className="illustration"
                src="https://d33wubrfki0l68.cloudfront.net/654d85cd22b82f034dfd52f00254871b2e2ea245/5947f/images/illustration-articles.svg"
                width="94"
                height="86"
                alt="Design System Articles"
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
            {articles.map(art => (
              <a
                className="block block-ds process"
                href={art.node.frontmatter.link}
                title={art.node.frontmatter.title}
                target="_blank"
                key={art.node.fields.slug}
              >
                <div className="content">
                  {' '}
                  <h3>{art.node.frontmatter.author}</h3>{' '}
                  <h2>{art.node.frontmatter.title}</h2>
                  <p className="clamp">{art.node.frontmatter.description}</p>
                  <span className="date">{art.node.frontmatter.date}</span>{' '}
                </div>{' '}
              </a>
            ))}
          </div>
        </article>
      </Layout>
    )
  }
}

export default ArticlePage

export const pageQuery = graphql`
  query ArticlesQuery {
    allMarkdownRemark(
      filter: { id: { regex: "/_articles/" } }
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
