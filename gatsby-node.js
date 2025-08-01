const path = require(`path`)
const chunk = require(`lodash/chunk`)
const { graphql } = require("gatsby")

// This is a simple debugging tool
// dd() will prettily dump to the terminal and kill the process
// const { dd } = require(`dumper.js`)

/**
 * exports.createPages is a built-in Gatsby Node API.
 * It's purpose is to allow you to create pages for your site! 💡
 *
 * See https://www.gatsbyjs.com/docs/node-apis/#createPages for more info.
 */
exports.createPages = async gatsbyUtilities => {
  // Query our posts from the GraphQL server
  const posts = await getPosts(gatsbyUtilities)
  const services = await getServices(gatsbyUtilities)
  const servicesPBS = await getServicesPBS(gatsbyUtilities)

  // If there are no posts in WordPress, don't do anything
  if (!posts.length) {
    return
  }

  // If there are posts, create pages for them
  await createIndividualBlogPostPages({ posts, gatsbyUtilities })

  // And a paginated archive
  await createBlogPostArchive({ posts, gatsbyUtilities })

  // Pages
  await createServices({ gatsbyUtilities })
  await createService({ services, gatsbyUtilities })
  await createServicePBS({ servicesPBS, gatsbyUtilities })
  await createUs({gatsbyUtilities})
  await createPolitics({gatsbyUtilities})
  await createContact({gatsbyUtilities})
  await createWorkWithUs({gatsbyUtilities})
}

/**
 * This function creates all the individual blog pages in this site
 */
const createIndividualBlogPostPages = async ({ posts, gatsbyUtilities }) =>
  Promise.all(
    posts.map(({ previous, post, next }) =>
      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      gatsbyUtilities.actions.createPage({
        // Use the WordPress uri as the Gatsby page path
        // This is a good idea so that internal links and menus work 👍
        path: `noticias${post.uri}`,

        // use the blog post template as the page component
        component: path.resolve(`./src/templates/detail-news.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // we need to add the post id here
          // so our blog post template knows which blog post
          // the current page is (when you open it in a browser)
          id: post.id,

          // We also use the next and previous id's to query them and add links!
          previousPostId: previous ? previous.id : null,
          nextPostId: next ? next.id : null,
        },
      })
    )
  )

/**
 * This function creates all the individual blog pages in this site
 */
async function createBlogPostArchive({ posts, gatsbyUtilities }) {
  const graphqlResult = await gatsbyUtilities.graphql(/* GraphQL */ `
    {
      wp {
        readingSettings {
          postsPerPage
        }
      }
      intern: wpPage(id: {eq: "cG9zdDozOTE="}) {
        id
        uri
      }
    }
  `)

  const { postsPerPage } = graphqlResult.data.wp.readingSettings

  const postsChunkedIntoArchivePages = chunk(posts, postsPerPage)
  const totalPages = postsChunkedIntoArchivePages.length

  return Promise.all(
    postsChunkedIntoArchivePages.map(async (_posts, index) => {
      const pageNumber = index + 1

      const getPagePath = page => {
        if (page > 0 && page <= totalPages) {
          // Since our homepage is our blog page
          // we want the first page to be "/" and any additional pages
          // to be numbered.
          // "/blog/2" for example
          return page === 1 ? graphqlResult.data.intern.uri : `${graphqlResult.data.intern.uri}${page}`
        }

        return null
      }

      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      await gatsbyUtilities.actions.createPage({
        path: getPagePath(pageNumber),

        // use the blog post archive template as the page component
        component: path.resolve(`./src/templates/list-news.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // the index of our loop is the offset of which posts we want to display
          // so for page 1, 0 * 10 = 0 offset, for page 2, 1 * 10 = 10 posts offset,
          // etc
          id: graphqlResult.data.intern.id,
          offset: index * postsPerPage,

          // We need to tell the template how many posts to display too
          postsPerPage,

          nextPagePath: getPagePath(pageNumber + 1),
          previousPagePath: getPagePath(pageNumber - 1),
        },
      })
    })
  )
}


async function createServices({gatsbyUtilities }) {
  const result = await gatsbyUtilities.graphql(`
    query ServicesQuery {
      wpPage(id: {eq: "cG9zdDo5MA=="}) {
        id
        uri
      }
    }
  `)

  if(result.errors){
    reporter.error("There was an error fetching services page", result.errors)
  }

  const { wpPage } = result.data
  
  return await gatsbyUtilities.actions.createPage({
    path: `${wpPage.uri}`,

    component: path.resolve(`./src/templates/services.js`),

    context: {
      id: wpPage.id,
      parentId: wpPage.id
    }
  })
}

async function createUs({ gatsbyUtilities }) {

  const result = await gatsbyUtilities.graphql(`
    query UsQuery {
      wpPage(id: {eq: "cG9zdDoyNDY="}) {
        id
        uri
      }
    }
  `)

  if(result.errors){
    reporter.error("There was an error fetching us page", result.errors)
  }

  const { wpPage } = result.data
  
  return await gatsbyUtilities.actions.createPage({
    path: `${wpPage.uri}`,

    component: path.resolve(`./src/templates/us.js`),

    context: {
      id: wpPage.id
    }
  })
}

async function createPolitics({ gatsbyUtilities }) {

  const result = await gatsbyUtilities.graphql(`
    query PoliticsQuery {
      wpPage(id: {eq: "cG9zdDoyMTI="}) {
        id
        uri
      }
    }
  `)

  if(result.errors){
    reporter.error("There was an error fetching us page", result.errors)
  }

  const { wpPage } = result.data
  
  return await gatsbyUtilities.actions.createPage({
    path: `${wpPage.uri}`,

    component: path.resolve(`./src/templates/politics.js`),

    context: {
      id: wpPage.id
    }
  })
}

async function createContact({ gatsbyUtilities }) {

  const result = await gatsbyUtilities.graphql(`
    query ContactQuery {
      wpPage(id: {eq: "cG9zdDoxOTM="}) {
        id
        uri
      }
    }
  `)

  if(result.errors){
    reporter.error("There was an error fetching us page", result.errors)
  }

  const { wpPage } = result.data
  
  return await gatsbyUtilities.actions.createPage({
    path: `${wpPage.uri}`,

    component: path.resolve(`./src/templates/contact.js`),

    context: {
      id: wpPage.id
    }
  })
}

async function createWorkWithUs({ gatsbyUtilities }) {

  const result = await gatsbyUtilities.graphql(`
    query WorkWithUsQuery {
      wpPage(id: {eq: "cG9zdDo0MzQ="}) {
        id
        uri
      }
    }
  `)

  if(result.errors){
    reporter.error("There was an error fetching us page", result.errors)
  }

  const { wpPage } = result.data
  
  return await gatsbyUtilities.actions.createPage({
    path: `${wpPage.uri}`,

    component: path.resolve(`./src/templates/workWithUs.js`),

    context: {
      id: wpPage.id
    }
  })
}

const createService = async ({ services, gatsbyUtilities }) =>
  Promise.all(
    services.map(( service ) =>
    
      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      gatsbyUtilities.actions.createPage({
        // Use the WordPress uri as the Gatsby page path
        // This is a good idea so that internal links and menus work 👍
        path: `${service.uri}`,

        // use the blog post template as the page component
        component: path.resolve(`./src/templates/service.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // we need to add the post id here
          // so our blog post template knows which blog post
          // the current page is (when you open it in a browser)
          id: service.id
        },
      })
    )
  )

const createServicePBS = async ({ servicesPBS, gatsbyUtilities }) =>
  Promise.all(
    servicesPBS.map(( service ) =>
    
      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      gatsbyUtilities.actions.createPage({
        // Use the WordPress uri as the Gatsby page path
        // This is a good idea so that internal links and menus work 👍
        path: `${service.uri}`,

        // use the blog post template as the page component
        component: path.resolve(`./src/templates/servicePbs.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // we need to add the post id here
          // so our blog post template knows which blog post
          // the current page is (when you open it in a browser)
          id: service.id
        },
      })
    )
  )


/**
 * This function queries Gatsby's GraphQL server and asks for
 * All WordPress blog posts. If there are any GraphQL error it throws an error
 * Otherwise it will return the posts 🙌
 *
 * We're passing in the utilities we got from createPages.
 * So see https://www.gatsbyjs.com/docs/node-apis/#createPages for more info!
 */


async function getPosts({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpPosts {
      # Query all WordPress blog posts sorted by date
      allWpPost(sort: { fields: [date], order: DESC }) {
        edges {
          previous {
            id
          }

          # note: this is a GraphQL alias. It renames "node" to "post" for this query
          # We're doing this because this "node" is a post! It makes our code more readable further down the line.
          post: node {
            id
            uri
          }

          next {
            id
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpPost.edges
}

async function getServices({ graphql, reporter }) {
  const graphqlResult = await graphql(`
    query ServicesQuery {
      allWpPage(filter: {parentId: {eq: "cG9zdDo5MA=="}}) {
        nodes {
          id
          uri
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your services pages`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpPage.nodes
}

async function getServicesPBS({ graphql, reporter }) {
  const graphqlResult = await graphql(`
    query ServicesQuery {
      allWpPage(filter: {parentId: {eq: "cG9zdDozNDY="}}) {
        nodes {
          id
          uri
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your services pages`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpPage.nodes
}