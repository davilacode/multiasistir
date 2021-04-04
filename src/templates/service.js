import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import parse from "html-react-parser"

// We're using Gutenberg so we need the block styles
import "@wordpress/block-library/build-style/style.css"
import "@wordpress/block-library/build-style/theme.css"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Service = ({ data: { service } }) => {

  const featuredImage = {
    fluid: service.featuredImage?.node?.localFile?.childImageSharp?.fluid,
    alt: service.featuredImage?.node?.alt || ``,
  }

  return (
    <Layout>
      <SEO title={service.title} description={service.excerpt} />

      <article
        className="blog-service"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{parse(service.title)}</h1>

          {/* if we have a featured image for this service let's display it */}
          {featuredImage?.fluid && (
            <Image
              fluid={featuredImage.fluid}
              alt={featuredImage.alt}
              style={{ marginBottom: 50 }}
            />
          )}
        </header>

        {!!service.content && (
          <section itemProp="articleBody">{parse(service.content)}</section>
        )}

        <hr />
      </article>
    </Layout>
  )
}

export default Service

export const pageQuery = graphql`
  query ServiceById(
    # these variables are passed in via createPage.pageContext in gatsby-node.js
    $id: String!
  ) {
    # selecting the current service by id
    service: wpPage(id: { eq: $id }) {
      id
      content
      title

      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              fluid(maxWidth: 1920, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
