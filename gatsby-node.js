const path = require('path')

exports.createPages = async ({graphql, actions}) => {
  const {data} = await graphql(`
    query Posts {
        allMarkdownRemark {
            nodes {
                frontmatter {
                    url
                    category
                }
            }
        }
    }
  `)

  data.allMarkdownRemark.nodes.forEach(elem => {
    const { url, category } = elem.frontmatter
    actions.createPage({
      path: `/${category}/${url}`,
      component: path.resolve('./src/templates/article.js'),
      context: {url}
    })
  })
}