import React from "react"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"

// We're using Gutenberg so we need the block styles
import "@wordpress/block-library/build-style/style.css"
import "@wordpress/block-library/build-style/theme.css"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TitleIntern from "../components/titleIntern"

const BlogPostTemplate = ({ data: { previous, next, post } }) => {
  const featuredImage = {
    fluid: post.featuredImage?.node?.localFile?.childImageSharp?.fluid,
    alt: post.featuredImage?.node?.alt || ``,
  }

  return (
    <Layout>
      <SEO title={post.title} description={post.excerpt} />
      <TitleIntern title={post.title} image={featuredImage.fluid} date={post.date} excerpt={post.excerpt} />
      <div className="container py-5">
        <div className="row">
          <div className="col-12">
            <article
              className="blog-post"
              itemScope
              itemType="http://schema.org/Article"
            >
              {!!post.content && (
                <section itemProp="articleBody">{parse(post.content)}</section>
              )}

              <hr />

              <footer>
              </footer>
            </article>
            <nav className="blog-post-nav">
              <ul
                style={{
                  display: `flex`,
                  flexWrap: `wrap`,
                  justifyContent: `space-between`,
                  listStyle: `none`,
                  padding: 0,
                }}
              >
                <li>
                  {previous && (
                    <Link to={`/noticias${previous.uri}`} rel="prev">
                      ← {parse(previous.title)}
                    </Link>
                  )}
                </li>

                <li>
                  {next && (
                    <Link to={`/noticias${next.uri}`} rel="next">
                      {parse(next.title)} →
                    </Link>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostById(
    # these variables are passed in via createPage.pageContext in gatsby-node.js
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    # selecting the current post by id
    post: wpPost(id: { eq: $id }) {
      id
      excerpt
      content
      title
      date(formatString: "MMMM DD, YYYY", locale: "es")

      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              fluid(maxWidth: 1000, quality: 100) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }
    }

    # this gets us the previous post by id (if it exists)
    previous: wpPost(id: { eq: $previousPostId }) {
      uri
      title
    }

    # this gets us the next post by id (if it exists)
    next: wpPost(id: { eq: $nextPostId }) {
      uri
      title
    }
  }
`
