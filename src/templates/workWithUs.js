import React from "react"
import { graphql } from "gatsby"
import parse from "html-react-parser"

import Layout from "../components/layout"
import Seo from "../components/seo"
import TitleIntern from "../components/titleIntern"
import WorkWithUsForm from "../components/workWithUsForm"

const WorkWithUs = ({ data: { workWithUs } }) => {

  const featuredImage = {
    fluid: workWithUs.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData
  }

  return (
    <Layout>
      <Seo title={workWithUs.title} />
      <TitleIntern title={workWithUs.title} image={featuredImage?.fluid} />
      <div className="wrap_content container">
        <div className="row py-5">
          <div className="col-md-12 form-contact">
            {parse(workWithUs.content)}
            <WorkWithUsForm />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default WorkWithUs

export const pageQuery = graphql`query WorkWithUsById($id: String) {
  workWithUs: wpPage(id: {eq: $id}) {
    id
    content
    title
    featuredImage {
      node {
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
