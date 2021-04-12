import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import parse from "html-react-parser"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TitleIntern from "../components/titleIntern"

const Us = ({data}) => {

  const detail = data.wpPage

  return (
    <Layout>
      <SEO title={detail.title} />
      <TitleIntern title={detail.title} image={detail.featuredImage.node.localFile.childImageSharp.fluid} />
      <div className="wrap_content container py-5">
        <div className="row">
          <div className="col-12">
            {parse(detail.content)}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Us

export const pageQuery = graphql`
  query UsQuery (
    $id: String
  ){
    wpPage(id: {eq: $id}) {
      uri
      title
      content
      featuredImage {
        node {
          localFile {
            childImageSharp {
              fluid (maxWidth: 1920, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
