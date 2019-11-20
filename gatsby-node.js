/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path")

// You can delete this file if you're not using it

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(
    `
      {
        allStrapiArticle {
          edges {
            node {
              id
            }
          }
        }
      }
    `
  )

  const posts = result.data.allStrapiArticle.edges

  posts.forEach(({ node }) => {
    createPage({
      path: `/${node.id}`,
      component: path.resolve(`src/templates/article.js`),
      context: { id: node.id },
    })
  })

  const getAuthors = await graphql(`
    {
      allStrapiUser {
        edges {
          node {
            id
          }
        }
      }
    }
  `)

  getAuthors.data.allStrapiUser.edges.forEach(({ node }) => {
    createPage({
      path: `/authors/${node.id}`,
      component: path.resolve(`src/templates/author.js`),
      context: {
        id: node.id,
      },
    })
  })
}
