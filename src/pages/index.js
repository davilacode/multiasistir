import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

import Banners from "../components/home/banners"
import Services from "../components/home/homeServices"
import Pac from "../components/home/pacSection"
import Pbs from "../components/home/pbsSection"

const Home = ({ data, location }) => {

  const siteTitle = data.site.siteMetadata.title
  const homeServices = data.allWpPage.nodes

  return (
    <Layout location={location} title={siteTitle} isHomePage>
      <Seo title="Inicio" lang="es"/>
      <Banners />
      <Services data={homeServices} />
      <Pac />
      <Pbs />
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
    allWpPage(filter: {parentDatabaseId: {eq: 90}}, sort: {order: ASC, fields: menuOrder}, limit: 3) {
      nodes {
        ACFLeadServices {
          leadHome
        }
        id
        uri
        title
        content
        featuredImage {
          node {
            localFile {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH, quality: 100)
              }
            }
          }
        }
      }
    }
  }
`
