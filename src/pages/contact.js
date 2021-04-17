import React from "react"
import { graphql } from "gatsby"
import parse from "html-react-parser"

// We're using Gutenberg so we need the block styles
// import "@wordpress/block-library/build-style/style.css"
// import "@wordpress/block-library/build-style/theme.css"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TitleIntern from "../components/titleIntern"

const Contact = ({ data: { contact } }) => {

  const featuredImage = {
    fluid: contact.featuredImage?.node?.localFile?.childImageSharp?.fluid,
  }

  return (
    <Layout>
      <SEO title={contact.title} />
      <TitleIntern title={contact.title} image={featuredImage?.fluid} />
    </Layout>
  )
}

export default Contact

export const pageQuery = graphql`
  query ContactById(
    $id: String!
  ) {
    # selecting the current service by id
    contact: wpPage(id: { eq: $id }) {
      id
      content
      title
      featuredImage {
        node {
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
