import React from "react"
import { Link, graphql } from "gatsby"
//import Img from "gatsby-image"
import parse from "html-react-parser"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Services = ({data}) => {

  const detail = data.wpPage
  const services = data.allWpPage.nodes

  return (
    <Layout>
      <SEO title={detail.title} />
      {parse(detail.content)}
      <ol style={{ listStyle: `none` }}>
        {services.map(service => {
          const title = service.title

          return (
            <li key={service.uri}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={`${service.uri}`} itemProp="url">
                      <span itemProp="headline">{parse(title)}</span>
                    </Link>
                  </h2>
                </header>
                <section itemProp="description">{parse(service.content)}</section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default Services

export const pageQuery = graphql`
  query MyQuery {
    allWpPage(filter: {parentDatabaseId: {eq: 90}}) {
      nodes {
        uri
        title
        content
        featuredImage {
          node {
            localFile {
              childImageSharp {
                fluid (maxWidth: 350) {
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
              fluid (maxWidth: 350) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
