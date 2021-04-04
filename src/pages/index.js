import React, { useEffect } from "react"
import { graphql } from "gatsby"
import WOW from 'wowjs';

import Layout from "../components/layout"
import SEO from "../components/seo"
import Banners from "../components/banners"
import Services from "../components/homeServices"

const Home = ({ data, location }) => {

  useEffect(() => {
    new WOW.WOW({
        live: false
    }).init();
  }, [])
  
  const siteTitle = data.site.siteMetadata.title
  const homeServices = data.allWpPage.nodes

  return (
    <Layout location={location} title={siteTitle} isHomePage>
      <SEO title="Inicio" lang="es"/>
      <Banners />
      <Services data={homeServices} />
    </Layout>
  )
}

export default Home

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allWpPage(filter: {parentDatabaseId: {eq: 90}}, sort: {order: ASC, fields: menuOrder}) {
      nodes {
        ACFLeadServices {
          text
        }
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
  }
`
