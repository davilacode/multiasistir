import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser"

import Layout from "../components/layout"
import Seo from "../components/seo"
import TitleIntern from "../components/titleIntern"

import CovidServices from "../components/services/covidServices"

const Services = ({data}) => {

  const detail = data.wpPage
  const services = data.allWpPage.nodes
  const accordionServices = detail.ACFInternServices.infoServices

  return (
    <Layout>
      <Seo title={detail.title} />
      <TitleIntern title={detail.title} image={detail.featuredImage.node.localFile.childImageSharp.gatsbyImageData} />
      <div className="wrap_content container py-5">
        <div className="row">
          <div className="col-12">
            <h2>Nuestros servicios habilitados</h2>
            
          </div>
          <div className="col-12"> 
            <div className="accordion" id="accordionServices">
              { 
                accordionServices && accordionServices.map(({title, icon, text}, i) => {
                  return (
                    <div className="accordion-item mb-5" key={i+title}>
                      <h2 className="accordion-header txt-white" id={`${title}`}>
                        <button className="accordion-button bg-blue-middle py-4 collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${i}`} aria-expanded="false" aria-controls={`collapse${i}`}>
                          <GatsbyImage image={icon.localFile.childImageSharp.gatsbyImageData} alt={title} className="me-4" />
                          {title}
                        </button>
                      </h2>
                      <div id={`collapse${i}`} className="accordion-collapse collapse" aria-labelledby={`${title}`} data-bs-parent="#accordionServices">
                        <div className="accordion-body">
                          {parse(text)}
                        </div>
                      </div>
                    </div>
                  )
                }) 
              }
            </div>
          </div>
          <div className="col-12">
            {parse(detail.content)}
          </div>
        </div>
        <div className="row pt-5">
          <ol className="services-list" style={{ listStyle: `none` }}>
            {services.map((service, index) => {
              const title = service.title
              const image = service?.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData

              return (
                <li className="container mb-4" key={service.uri}>
                  <article
                    className="row align-items-center"
                    itemScope
                    itemType="http://schema.org/Article"
                  >
                    <figure className={`col-lg-5 px-0 mb-0 wow ${index % 2 === 0 ? "order-lg-1 ps-0 animate__fadeInLeft" : "order-lg-2 order-md-1 pe-0 animate__fadeInRight"}`}>
                      {image &&
                        <GatsbyImage
                          image={image}
                          className={`${index % 2 !== 0 ? "ms-auto" : ""}`}
                          alt={title} />
                      }
                    </figure>
                    <Link className={`col-lg-7 py-4 px-5 ${index % 2 === 0 ? "order-lg-2" : "order-lg-1 order-md-2"}`} to={`${service.uri}`} itemProp="url">
                      <h2>{parse(title)}</h2>
                      <p>{service.ACFLeadServices?.leadList && parse(service.ACFLeadServices.leadList)}</p>
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

export const pageQuery = graphql`query ServicesQuery($id: String, $parentId: ID) {
  allWpPage(
    filter: {parentId: {eq: $parentId}}
    sort: {order: ASC, fields: menuOrder}
    limit: 3
  ) {
    nodes {
      uri
      title
      ACFLeadServices {
        leadList
      }
      featuredImage {
        node {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 600, quality: 100, layout: CONSTRAINED)
            }
          }
        }
      }
    }
  }
  wpPage(id: {eq: $id}) {
    id
    uri
    title
    content
    featuredImage {
      node {
        localFile {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }
    ACFInternServices {
      infoServices {
        title
        text
        icon {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 60, placeholder: NONE, layout: FIXED)
            }
          }
        }
      }
    }
  }
}
`
