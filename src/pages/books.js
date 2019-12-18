import React from 'react'
import { Link } from "gatsby"
import Layout from '../components/layout'

class BooksPage extends React.Component {
  // state = { currentTag: 'all' }
  // toggleMode = tag => () => this.setState({ currentTag: tag })
  render() {
    const { data } = this.props
    const { allMarkdownRemark } = data
    const { edges } = allMarkdownRemark

    // const { currentTag } = this.state
    // let tags = new Set()
    // edges.forEach(
    //   ({ node }) =>
    //     node.frontmatter.tags &&
    //     node.frontmatter.tags.forEach(tag => tags.add(tag))
    // )
    // tags = Array.from(tags) // .sort((a, b) => a > b)
    // const books =
    //   currentTag === 'all'
    //     ? edges
    //     : edges.filter(edge => edge.node.frontmatter.tags.includes(currentTag))
    const books = edges
    return (
      <Layout>
        <article className="post post-books">
          <header className="post-header clearfix">
            <div className="post-head-wrap">
              {' '}
              <div className="post-head-content">
                <h1 className="post-title">Books</h1>
                <p>
                  A list of good books on the subject of design systems. If you
                  have any recommendations, please send me a tweet at{' '}
                  <a href="https://twitter.com/jadlimcaco" title="My Twitter">
                    @jadlimcaco
                  </a>{' '}
                  and I will add it to the list.
                </p>
              </div>{' '}
              <img
                className="illustration"
                src="https://d33wubrfki0l68.cloudfront.net/dce587ab2373d627b2aa3b1e5a2f840a792135ed/8c350/images/illustration-books.svg"
                width="94"
                height="86"
                alt="Design System Books"
              />
            </div>{' '}
          </header>
          {/* <ul className="filter">
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
        </ul> */}
          <div className="post-content holder">
            {books.map(art => (
              <a
                className="block block-books"
                href={art.node.frontmatter.link}
                title={art.node.frontmatter.title}
                target="_blank"
                key={art.node.fields.slug}
              >
                <div className="img-wrap">
                  {' '}
                  <img
                    src={'/' + art.node.frontmatter.image}
                    alt={art.node.frontmatter.title}
                    width="800"
                    height="400"
                  />
                </div>{' '}
                <div className="content">
                  {' '}
                  <h3>{art.node.frontmatter.author}</h3>{' '}
                  <h2>{art.node.frontmatter.title}</h2>
                  <p className="clamp">
                    {art.node.frontmatter.description}
                  </p>{' '}
                </div>{' '}
              </a>
            ))}
          </div>
        </article>
      </Layout>
    )
  }
}

export default BooksPage

export const pageQuery = graphql`
  query BookssQuery {
    allMarkdownRemark(
      filter: { id: { regex: "/_books/" } }
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
