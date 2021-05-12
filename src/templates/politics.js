import React from "react"
import { graphql } from "gatsby"
import parse from "html-react-parser"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TitleIntern from "../components/titleIntern"

const Politics = ({data}) => {

  const detail = data.wpPage
  const allPolitics = data.wpPage.ACFPolitics.politics
  const icon = data.download.childImageSharp.fixed

  return (
    <Layout>
      <SEO title={detail.title} />
      <TitleIntern title={detail.title} image={detail.featuredImage.node.localFile.childImageSharp.fluid} />
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
                    <Img fixed={icon} />
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

export const pageQuery = graphql`
  query PoliticsQuery (
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
        fixed (width:75, height: 75){
          ...GatsbyImageSharpFixed_noBase64
        }
      }
    }
  }
`
