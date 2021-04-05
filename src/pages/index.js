import React, { useEffect } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Banners from "../components/home/banners"
import Services from "../components/home/homeServices"
import Pac from "../components/home/pacSection"
import Pbs from "../components/home/pbsSection"

const Home = ({ data, location }) => {
  let WOW;
  useEffect(() => {
    let WOW = require("wowjs");
    new WOW.WOW({live: false, animateClass: 'animate__animated'}).init();
  }, []);

  useEffect(() => {
    if (WOW) {
      WOW.sync();
    }
  });

  const siteTitle = data.site.siteMetadata.title
  const homeServices = data.allWpPage.nodes

  return (
    <Layout location={location} title={siteTitle} isHomePage>
      <SEO title="Inicio" lang="es"/>
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
