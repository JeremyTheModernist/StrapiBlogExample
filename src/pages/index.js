import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Img from "gatsby-image"
import ReactMarkdown from "react-markdown"

const IndexPage = ({ data }) => {
  var {
    allStrapiArticle: { edges },
  } = data
  console.log(edges)
  return (
    <Layout>
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <ul>
        {edges.map(({ node }, index) => {
          return (
            <li key={node.id} article={node}>
              <h2>
                <Link to={`/${node.id}`}>{node.title}</Link>
              </h2>
              <Img fluid={node.image.childImageSharp.fluid}></Img>
              {/* <ReactMarkdown source={node.content} /> */}
            </li>
          )
        })}
      </ul>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  {
    allStrapiArticle {
      edges {
        node {
          id
          title
          content
          image {
            childImageSharp {
              fluid(maxWidth: 960) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
