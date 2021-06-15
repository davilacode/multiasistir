import React from "react"
import { graphql } from "gatsby"
import parse from "html-react-parser"
import { GatsbyImage } from "gatsby-plugin-image";

import Layout from "../components/layout"
import Seo from "../components/Seo"
import TitleIntern from "../components/titleIntern"

const Politics = ({data}) => {

  const detail = data.wpPage
  const allPolitics = data.wpPage.ACFPolitics.politics
  const icon = data.download.childImageSharp.gatsbyImageData

  return (
    <Layout>
      <Seo title={detail.title} />
      <TitleIntern title={detail.title} image={detail.featuredImage.node.localFile.childImageSharp.gatsbyImageData} />
      <div className="wrap_content container py-5">
        <div className="row">
          <div className="col-12">
            {detail?.content && parse(detail.content)}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="list-politics">
              {allPolitics.map((politic, i) => (
                <a key={i} href={politic?.file?.localFile?.publicURL} download>
                  <div>
                    <GatsbyImage image={icon} />
                    <h2>{politic.title}</h2>
                  </div>
                  <span class="btn-link m-auto">Descargar</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Politics

export const pageQuery = graphql`query PoliticsQuery($id: String) {
  wpPage(id: {eq: $id}) {
    uri
    title
    content
    featuredImage {
      node {
        localFile {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
      }
    }
    ACFPolitics {
      politics {
        title
        file {
          id
          localFile {
            publicURL
          }
        }
      }
    }
  }
  download: file(name: {eq: "icon-download"}) {
    childImageSharp {
      gatsbyImageData(width: 75, height: 75, placeholder: NONE, layout: FIXED)
    }
  }
}
`
