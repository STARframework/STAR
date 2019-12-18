import React from 'react'
import { Link } from "gatsby"
import Layout from '../components/layout'

class TalksPage extends React.Component {
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
        <article className="post post-talks">
          <header className="post-header clearfix">
            <div className="post-head-wrap">
              {' '}
              <div className="post-head-content">
                <h1 className="post-title">Talks on Design Systems</h1>
                <p>
                  Helpful talks and presentations from the best in the industry.
                  Learn more about the innovation that is happening in design
                  systems and design tooling.
                </p>
              </div>{' '}
              <img
                className="illustration"
                src="https://d33wubrfki0l68.cloudfront.net/f62a11589e6a7de064e287f25bc30ed7797e10f1/71c1d/images/illustration-talks.svg"
                width="94"
                height="86"
                alt="Talks on Design Systems"
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
                className="block block-talks"
                href={art.node.frontmatter.link}
                title={art.node.frontmatter.title}
                target="_blank"
              >
                {' '}
                <div className="img-wrap">
                  <img
                    src={'/' + art.node.frontmatter.image}
                    alt={art.node.frontmatter.title}
                    width="800"
                    height="400"
                  />
                </div>
                <div className="content">
                  {' '}
                  <h3>{art.node.frontmatter.author}</h3>{' '}
                  <h2>{art.node.frontmatter.title}</h2>
                  <p className="clamp">
                    {art.node.frontmatter.description}
                  </p>{' '}
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

export default TalksPage

export const pageQuery = graphql`
  query TalksQuery {
    allMarkdownRemark(
      filter: { id: { regex: "/_talks/" } }
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
