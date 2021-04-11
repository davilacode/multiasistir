import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import parse from "html-react-parser"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TitleIntern from "../components/titleIntern"

import CovidServices from "../components/services/covidServices"

const Services = ({data}) => {

  const detail = data.wpPage
  const services = data.allWpPage.nodes

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
        <div className="row pt-5">
          <ol className="services-list" style={{ listStyle: `none` }}>
            {services.map((service, index) => {
              const title = service.title
              const image = service?.featuredImage?.node?.localFile?.childImageSharp?.fluid

              return (
                <li className="container mb-4" key={service.uri}>
                  <article
                    className="row align-items-center"
                    itemScope
                    itemType="http://schema.org/Article"
                  >
                    <figure className={`col-md-5 mb-0 wow ${index % 2 === 0 ? "order-1 ps-0 animate__fadeInLeft" : "order-2 pe-0 animate__fadeInRight"}`}>
                      {image &&
                        <Img className={`${index % 2 !== 0 ? "ms-auto" : ""}`} fluid={image} alt={title}/>
                      }
                    </figure>
                    <Link className={`col-md-7 py-4 px-5 order-${index % 2 === 0 ? "2" : "1"}`} to={`${service.uri}`} itemProp="url">
                      <h2>{parse(title)}</h2>
                      {service.content && parse(service.content)}
                      <span className="btn-link m-auto">Más info</span>
                    </Link>
                    
                  </article>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
      <CovidServices />
    </Layout>
  )
}

export default Services

export const pageQuery = graphql`
  query MyQuery {
    allWpPage(filter: {parentDatabaseId: {eq: 90}}, sort: {order: ASC, fields: menuOrder}, limit: 3) {
      nodes {
        uri
        title
        content
        featuredImage {
          node {
            localFile {
              childImageSharp {
                fluid (maxWidth: 350, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    wpPage(slug: {eq: "servicios"}) {
      id
      uri
      title
      content
      featuredImage {
        node {
          localFile {
            childImageSharp {
              fluid (maxWidth: 1920) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
