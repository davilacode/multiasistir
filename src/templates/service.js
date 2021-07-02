import React from "react"
import { graphql } from "gatsby"
import parse from "html-react-parser"

// We're using Gutenberg so we need the block styles
import "@wordpress/block-library/build-style/style.css"
import "@wordpress/block-library/build-style/theme.css"

import Layout from "../components/layout"
import Seo from "../components/Seo"
import TitleIntern from "../components/titleIntern"

const Service = ({ data: { service } }) => {

  const featuredImage = {
    fluid: service.ACFLeadServices?.banner?.localFile?.childImageSharp?.gatsbyImageData
  }

  return (
    <Layout>
      <Seo title={service.title} description={service.excerpt} />
      <TitleIntern title={service.title} image={featuredImage.fluid} />
      <div className="wrap_content intern_services container py-5">
        <div className="row">
          <div className="col-12">
            {!!service.content && (
              <>{parse(service.content)}</>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Service

export const pageQuery = graphql`query ServiceById($id: String!) {
  service: wpPage(id: {eq: $id}) {
    id
    content
    title
    ACFLeadServices {
      banner {
        localFile {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
      }
    }
  }
}
`
